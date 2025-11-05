export interface LoanInterface {
  id: string;
  farmerId: string;
  amount: number;
  purposeOfLoan: string;
  repaymentDuration: string;
  preferredPaymentMethod: string;
  collateralDocuments: string[];
  status?: "pending" | "approved" | "rejected";
  createdAt: Date;
}
