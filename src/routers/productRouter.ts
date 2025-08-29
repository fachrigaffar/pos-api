import { Router } from "express";
import {createProduct, getProducts, getProductsById, updateProduct, deleteProduct} from "../controllers/productController"
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticate, createProduct);
router.get("/", authenticate, getProducts);
router.get("/:id", authenticate, getProductsById);
router.put("/:id", authenticate, updateProduct);
router.delete("/:id", authenticate, deleteProduct);

export default router;
