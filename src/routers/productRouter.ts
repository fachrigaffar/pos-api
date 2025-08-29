import { Router } from "express";
import {createProduct, getProducts, getProductById, updateProduct, deleteProduct} from "../controllers/productController"
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticate, createProduct);
router.get("/", authenticate, getProducts);
router.get("/:id", authenticate, getProductById);
router.put("/:id", authenticate, updateProduct);
router.delete("/:id", authenticate, deleteProduct);

export default router;
