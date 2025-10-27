import { ErrorConstructor } from "../../utils/errors.js";
import type { UserInterface } from "./authentication.interface.js";
import { UserRepository } from "./authentication.repository.js";
import { UserSchema } from "./authentication.validation.js";
import * as uuid from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { sendEmail } from "../../utils/email.js";
import "dotenv/config";

const saltRounds = 10;

export class UserService {
  static async createUser(payload: Partial<UserInterface>) {
    const result = UserSchema.safeParse(payload);

    if (result.success) {
      const password = await bcrypt.hash(result.data.password, saltRounds);

      return await UserRepository.createUser({
        id: uuid.v4(),
        ...result.data,
        password,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      throw new ErrorConstructor("Validation error", 422, result.error.message);
    }
  }

  static async loginUser(payload: { emailOrPhone: string; password: string }) {
    const user = await UserRepository.loginUser({
      emailOrPhone: payload.emailOrPhone,
      password: payload.password,
    });

    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "3 days" }
      );

      const { id, password, ...otherDetails } = user;
      return {
        data: otherDetails,
        token,
      };
    } else {
      return null;
    }
  }

  static async forgotPassword(email: string) {
    const resetDetails = await UserRepository.forgotPassword(email);

    if (resetDetails) {
      const token = Buffer.from(
        JSON.stringify({
          resetToken: resetDetails.resetToken,
          email: resetDetails.email,
        })
      ).toString("base64");

      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

      await sendEmail({
        to: resetDetails.email,
        subject: "Password Reset",
        html: `
        <p>Hi ${resetDetails.name},</p>
        <p>You requested to reset your password.</p>
        <p> Please, click the link below to reset your password</p>
        <a href="https://${resetUrl}">Reset Password</a>`,
      });

      return;
    } else {
      return null;
    }
  }

  static async resetPassword(payload: { token: string; password: string }) {
    const decodedToken = JSON.parse(
      Buffer.from(payload.token, "base64").toString("utf-8")
    );

    const password = await bcrypt.hash(payload.password, saltRounds);

    await UserRepository.resetPassword({
      resetToken: decodedToken.resetToken,
      email: decodedToken.email,
      password,
    });
  }
}
