import prisma from "../config/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const register = async (data: { email: string; name?: string; password: string }) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await prisma.user.create({
        data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        },
    });
};

export const login = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Invalid credentials");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid credentials");

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1d",
    });

    return { token, user };
};
