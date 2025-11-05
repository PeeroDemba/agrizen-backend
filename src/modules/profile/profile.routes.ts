import express from "express";
import { ProfileController } from "./profile.controller.js";
import { authMiddleware } from "../../utils/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, ProfileController.getProfile);

export default router;
