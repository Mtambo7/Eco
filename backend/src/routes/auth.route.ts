import { Router } from "express";

import { login, signup, logout, getMe } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/getMe",authMiddleware, getMe);

export default router;
