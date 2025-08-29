import prisma from "../config/prisma";

export const createProduct = async (data: {name: string; description?: string; price: number; stock?: number; categoryId?: number})=>{
    return await prisma.product.create({data});
};

export const getProducts = async ()=>{
    return await prisma.product.findMany();
};

export const getProductsById = async (id: number)=>{
    return await prisma.product.findUnique({where : {id}});
};

export const updateProduct = async (id: number, data: {name: string; description?: string; price: number; stock?: number; categoryId?: number})=>{
    return await prisma.product.update({where: {id}, data});
};

export const deleteProduct = async (id: number)=>{
    return await prisma.product.delete({where : {id}});
};

