import express from 'express';
import cors from 'cors';
import authRouter from "./routers/authRouter";
import productRoute from "./routers/productRouter";
import categoryRoute from "./routers/categoryRouter"
import orderRouter from "./routers/orderRouter"
import path from 'path';

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRoute)
app.use("/api/categories", categoryRoute);
app.use("/api/orders", orderRouter);

export default app;