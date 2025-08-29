import prisma from "../config/prisma";

export const createCategory = async (data: { name: string }) => {
    return await prisma.category.create({data});
}

export const getCategorys = async ()=>{
    return await prisma.category.findMany();
};

export const getProductsById = async (id: number)=>{
    return await prisma.product.findUnique({where : {id}});
};