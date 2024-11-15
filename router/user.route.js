import { Router } from "express";
import { registereduser } from "../controller/user.controler.js";
import loginuser from "../controller/login.controler.js";

const router=Router();

router.route("/register").post(registereduser);
router.route("/login").post(loginuser);
export default router;