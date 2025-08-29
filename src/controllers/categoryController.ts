import { Request, Response } from "express";
import * as categoryService from "../services/categoryService";

export const createCategory = async (req: Request, res: Response)=>{
    try {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json(category);
    } catch (error : any) {
        res.status(400).json({ error: error.message });
    }
};

export const getCategories = async (req: Request, res: Response)=>{
    try {
        const categorys = await categoryService.getCategories();
        res.json(categorys);
    } catch (error : any) {
        res.status(400).json({ error: error.message });
    }
};

export const getCategoryById = async (req: Request, res: Response)=>{
    try {
        const category = await categoryService.getCategoryById(Number(req.params.id));
        if(!category) return res.status(404).json({error : "Category not found"});
        res.json(category);
    } catch (error : any) {
        res.status(400).json({ error: error.message });
    }
};

export const updateCategory = async (req: Request, res: Response)=>{
    try {
        const category = await categoryService.updateCategory(Number(req.params.id), req.body);
        res.json(category);
    } catch (error : any) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteCategory = async (req: Request, res: Response)=>{
    try {
        await categoryService.deleteCategory(Number(req.params.id));
        res.json({message: "Category delete successfully"})
    } catch (error : any) {
        res.status(400).json({ error: error.message });
    }
};