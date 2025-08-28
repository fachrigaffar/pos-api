import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from "./routers/authRouter";

const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRouter);


export default app;