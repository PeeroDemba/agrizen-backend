export interface UserInterface {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  role: "admin" | "farmer";
  password: string;
  state: string;
  nationalId: number;
  resetToken?: string | null;
  resetTokenExpiredAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
