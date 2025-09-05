import { Request, Response } from "express";
import * as orderService from "../services/orderService";
import { AuthRequest } from "../middleware/authMiddleware";

export const createOrder = async(req: AuthRequest, res: Response)=>{
    try {
        const userId = (req as any).user?.userId;
        const {items} = req.body

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if(!items || !Array.isArray(items) || items.length === 0){
            return res.status(400).json({message: "Items are required"});
        }
        const order = await orderService.createOrder(userId, items);
        res.status(201).json(order);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getOrders = async(req: Request, res: Response)=>{
    try {
        const userId = (req as any).user?.userId;
        const orders = await orderService.getOrders(userId);

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        res.json(orders);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getOrderById = async(req: Request, res: Response)=>{
    try {
        const userId = (req as any).user?.userId;
        const id = Number(req.params.id);
        const order = await orderService.getOrderById(id, userId);
        
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if(!order) return res.status(404).json({message: "Order not found"});
        res.json(order);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

