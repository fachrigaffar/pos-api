import prisma from "../config/prisma";
interface ProductInput {
  name: string;
  description?: string;
  price: number;
  stock?: number;
  categoryId?: number | null;
  imageUrl?: string | null;
}

interface ProductUpdateInput {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryId?: number | null;
  imageUrl?: string | null;
}

export const createProduct = async (data: ProductInput) => {
  return await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock ?? 0,
      categoryId: data.categoryId,
      imageUrl: data.imageUrl,
    },
  });
};

export const getProducts = async () => {
  return await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
};

export const updateProduct = async (id: number, data: ProductUpdateInput) => {
  return prisma.product.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.price !== undefined && { price: data.price }),
      ...(data.stock !== undefined && { stock: data.stock }),
      ...(data.categoryId !== undefined && { categoryId: data.categoryId }),
      ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
    },
  });
};

export const deleteProduct = async (id: number) => {
  return prisma.product.delete({
    where: { id },
  });
};
