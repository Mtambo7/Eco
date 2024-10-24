import { Router } from "express";

import { createOrder, getOrders, getOrderById, updateOrder } from "../controllers/order.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getOrders);
router.get("/:id", authMiddleware, getOrderById);
router.put("/:id", authMiddleware, updateOrder);


export default router;
