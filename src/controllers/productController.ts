import { Request, Response } from "express";
import * as productService from "../services/productService";


export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error : any) {
        res.status(400).json({ error: error.message });
    }
};

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await productService.getProducts();
        res.json(products);
    } catch (error : any) {
        res.status(400).json({ error: error.message });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await productService.getProductById(Number(req.params.id));
        if(!product) return  res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (error : any) {
        res.status(400).json({ error: error.message });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await productService.updateProduct(Number(req.params.id), req.body);
        res.json(product);
    } catch (error : any) {
        res.status(400).json({ error: error.message });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        await productService.deleteProduct(Number(req.params.id));
        res.json({message : "Product delete successfully"});
    } catch (error : any) {
        res.status(400).json({ error: error.message });
    }
};
