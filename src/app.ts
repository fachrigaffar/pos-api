import express from 'express';
import cors from 'cors';
import authRouter from "./routers/authRouter";
import productRoute from "./routers/productRouter";

const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRoute)


export default app;