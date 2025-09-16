import { Router } from "express";
import {createProduct, getProducts, getProductById, updateProduct, deleteProduct} from "../controllers/productController"
import { authenticate } from "../middleware/authMiddleware";
import { upload } from "../middleware/upload";

const router = Router();

router.post("/", authenticate, upload.single("image") ,createProduct);
router.get("/", authenticate, getProducts);
router.get("/:id", authenticate, getProductById);
router.put("/:id", authenticate, upload.single("image"),updateProduct);
router.delete("/:id", authenticate, deleteProduct);

export default router;
