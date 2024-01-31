import express from "express";
import userRouter from "./routes/userRoute.js"

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);

export default app;