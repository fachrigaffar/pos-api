import { Router } from "express";
import {createOrder, getOrders, getOrderById} from "../controllers/orderController"
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticate, createOrder);
router.get("/", authenticate, getOrders);
router.get("/:id", authenticate, getOrderById);

export default router;