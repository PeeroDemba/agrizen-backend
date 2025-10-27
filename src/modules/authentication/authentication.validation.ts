import * as z from "zod";

export const UserSchema = z.object({
  fullName: z.string().nonoptional({ error: "Fullname cannot be empty" }),
  phone: z.string().nonoptional({ error: "Phone cannot be empty" }),
  email: z
    .email({ error: "Invalid Email" })
    .nonoptional({ error: "Email cannot be empty" }),
  role: z
    .enum(["admin", "farmer"], { error: "Role must be either admin or farmer" })
    .nonoptional({ error: "Role cannot be empty" }),
  password: z
    .string()
    .min(8, { error: "Password must exceed 8 characters" })
    .nonoptional({ error: "Password cannot be empty" }),
  state: z.string().nonoptional({ error: "State cannot be empty" }),
  nationalId: z.preprocess(
    (value) => String(value),
    z
      .string()
      .length(11, { error: "National ID must be exactly 11 digits" })
      .nonoptional({ error: "National ID cannot be empty" })
      .transform((string) => Number(string))
  ),
});
