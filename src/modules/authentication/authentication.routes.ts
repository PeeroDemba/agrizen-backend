import express from "express";
import { UserController } from "./authentication.controller.js";

const router = express.Router();

router.post("/register", UserController.createUser);

router.post("/login", UserController.loginUser);

router.patch("/forgot-password", UserController.forgotPassword);

router.patch("/reset-password", UserController.resetPassword);

export default router;
