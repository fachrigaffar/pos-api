import { Request, Response } from "express";
import * as productService from "../services/productService";
import path from "path";
import fs from "fs";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const product = await productService.createProduct({
      name,
      description,
      price: Number(price),
      stock: stock ? Number(stock) : 0,
      categoryId: categoryId ? Number(categoryId) : null,
      imageUrl,
    });
    return res.status(201).json(product);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getProducts();
    return res.json(products);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.json(product);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, description, price, stock, categoryId } = req.body;

    const oldProduct = await productService.getProductById(Number(id));
    if (!oldProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    let imageUrl = oldProduct.imageUrl;

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;

      if (oldProduct.imageUrl) {
        const oldPath = path.join(__dirname, "../uploads", oldProduct.imageUrl);

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
    }

    const product = await productService.updateProduct(id, {
      name,
      description,
      price: Number(price),
      stock: stock ? Number(stock) : 0,
      categoryId: categoryId ? Number(categoryId) : null,
      imageUrl,
    });
    return res.json(product);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await productService.getProductById(Number(id));

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.imageUrl) {
      const filePath = path.join(__dirname, "../uploads", product.imageUrl);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    await productService.deleteProduct(Number(id));

   return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
