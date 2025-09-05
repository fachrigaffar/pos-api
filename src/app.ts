import express from 'express';
import cors from 'cors';
import authRouter from "./routers/authRouter";
import productRoute from "./routers/productRouter";
import categoryRoute from "./routers/categoryRouter"
import orderRouter from "./routers/orderRouter"


const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRoute)
app.use("/api/categories", categoryRoute);
app.use("/api/orders", orderRouter);

export default app;