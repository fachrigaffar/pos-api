import prisma from "../config/prisma";

export const createOrder = async (userId: string, items: { productId: number; quantity: number }[])=>{
    return await prisma.$transaction(async (tx)=>{
        let total = 0;

        const orderItems = await Promise.all(
            items.map(async (item)=>{
                const product = await tx.product.findUnique({where: {id: item.productId}});
                if(!product) throw new Error(`Product ${item.productId} not found`);
                if (product.stock < item.quantity) throw new Error(`Insufficient stock for ${product.name}`);

                const price = product.price * item.quantity;
                total += price;

                await tx.product.update({
                    where: {id: item.productId},
                    data: {stock: product.stock - item.quantity}
                });

                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price * item.quantity,
                };
            })
        );

        const order = await tx.order.create({
            data: {
                userId,
                total,
                items: {
                    create: orderItems,
                },
            },
            include: {items: true},
        });
        return order;
    });
};

export const getOrders = async (userId: string)=>{
    return prisma.order.findMany({
        where: {userId},
        include: {items: { include: {product: true}}},
        orderBy: {createdAt: "desc"},
    });
};

export const getOrderById = async (id: number, userId: string)=>{
    return prisma.order.findFirst({
        where: {id, userId},
        include: {items: {include: {product: true}}},
    })
};
