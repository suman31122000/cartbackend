import express from "express";
import cors from "cors";
import userRouter from "./router/user.route.js";

const app=express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello from userRouter!");
  });
app.use("/api/v1",userRouter);

export default app;