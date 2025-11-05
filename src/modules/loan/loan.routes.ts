import express from "express";
import { LoanController } from "./loan.controller.js";
import { authMiddleware } from "../../utils/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, LoanController.createLoan);

router.get("/", authMiddleware, LoanController.getLoans);

router.get("/:id", authMiddleware, LoanController.getLoan);

router.delete("/:id", authMiddleware, LoanController.deleteLoan);

router.patch("/:id/approve", authMiddleware, LoanController.approveLoan);

router.patch("/:id/reject", authMiddleware, LoanController.rejectLoan);

export default router;
