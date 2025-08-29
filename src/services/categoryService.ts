import prisma from "../config/prisma";

export const createCategory = async (data: { name: string }) => {
    return await prisma.category.create({data});
}

export const getCategories = async ()=>{
    return await prisma.category.findMany();
};

export const getCategoryById = async (id: number)=>{
    return await prisma.category.findUnique({where : {id}});
};

export const updateCategory = async (id: number, data: { name: string }) => {
    return await prisma.category.update({where: {id},data});
}

export const deleteCategory = async (id: number)=>{
    return await prisma.category.delete({where : {id}});
};
