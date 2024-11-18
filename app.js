import express from "express";
import cors from "cors";
import userRouter from "./router/user.route.js";
import cookieParser from "cookie-parser";

const app=express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("Hello from userRouter!");
  });
app.use("/v1",userRouter);

export default app;