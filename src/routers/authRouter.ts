import { Router } from "express";
import { register, login } from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);

// router.get("/", authenticate, listProducts);

export default router;