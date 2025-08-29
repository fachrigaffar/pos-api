import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import {createCategory, getCategories, getCategoryById, updateCategory, deleteCategory} from "../controllers/categoryController"

const router = Router();

router.post("/", authenticate, createCategory);
router.get("/", authenticate, getCategories);
router.get("/:id", authenticate, getCategoryById);
router.put("/:id", authenticate, updateCategory);
router.delete("/:id", authenticate, deleteCategory);

export default router; 