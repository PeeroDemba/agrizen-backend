import { Op } from "sequelize";
import User from "../../database/models/user.js";
import type { UserInterface } from "./authentication.interface.js";
import * as bcrypt from "bcrypt";
import sequelize from "../../database/models/index.js";
import { ErrorConstructor } from "../../utils/errors.js";

const saltRounds = 10;

export class UserRepository {
  static async createUser(payload: UserInterface) {
    return await User.create(payload);
  }

  static async loginUser(payload: { emailOrPhone: string; password: string }) {
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: payload.emailOrPhone },
          { phone: payload.emailOrPhone },
        ],
      },
      attributes: {
        exclude: ["nationalId", "resetToken", "resetTokenExpiredAt"],
      },
      raw: true,
    });

    if (user) {
      if (bcrypt.compareSync(payload.password, user.password)) {
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  static async forgotPassword(email: string) {
    const transaction = await sequelize.transaction();

    try {
      const user = await User.findOne({
        where: {
          email,
        },
        raw: true,
        transaction,
      });

      if (user) {
        let resetToken = crypto.randomUUID();
        const encryptedResetToken = await bcrypt.hash(resetToken, saltRounds);

        await User.update(
          {
            resetToken: encryptedResetToken,
            resetTokenExpiredAt: new Date(Date.now() + 15 * 60 * 1000),
          },
          {
            where: {
              email,
            },
            transaction,
          }
        );

        await transaction.commit();
        return { name: user.fullName, email, resetToken };
      } else {
        await transaction.commit();
        return null;
      }
    } catch (e) {
      await transaction.rollback();
    }
  }

  static async resetPassword(payload: {
    resetToken: string;
    email: string;
    password: string;
  }) {
    const transaction = await sequelize.transaction();

    try {
      const user = await User.findOne({
        where: {
          email: payload.email,
        },
        raw: true,
        transaction,
      });

      if (user) {
        const tokenVerification = bcrypt.compareSync(
          payload.resetToken,
          user.resetToken!
        );
        const tokenExpired = new Date() > new Date(user.resetTokenExpiredAt!);

        if (tokenExpired) {
          throw new ErrorConstructor("Token expired", 401);
        } else if (tokenVerification) {
          await User.update(
            {
              resetToken: null,
              resetTokenExpiredAt: null,
              password: payload.password,
            },
            {
              where: {
                email: payload.email,
              },
              transaction,
            }
          );
        } else {
          throw new ErrorConstructor("Invalid token", 401);
        }

        await transaction.commit();
      }
    } catch (e) {
      await transaction.rollback();
    }
  }
}
