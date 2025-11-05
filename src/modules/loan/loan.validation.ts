import * as z from "zod";

export const LoanSchema = z.object({
  amount: z
    .number({ error: "Amount must be a number" })
    .nonoptional({ error: "Amount cannot be empty" }),
  purposeOfLoan: z
    .string()
    .nonoptional({ error: "Purpose of loan cannot be empty" }),
  repaymentDuration: z
    .string()
    .nonoptional({ error: "Repayment duration cannot be empty" }),
  preferredPaymentMethod: z
    .string()
    .nonoptional({ error: "Preferred payment method cannot be empty" }),
  collateralDocuments: z
    .array(z.string())
    .min(1, { error: "Collateral documents cannot be empty" })
    .nonoptional({ error: "Collateral documents cannot be empty" }),
});
