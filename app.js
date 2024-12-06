import express from "express";
import cors from "cors";
import userRouter from "./router/user.route.js";
import cookieParser from "cookie-parser";

const app=express();
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
  });

app.use(cors({
  origin: 'https://wcommerce.netlify.app',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello from userRouter!");
  });
app.use("/",userRouter);

export default app;