import { Router } from "express";
import { registereduser } from "../controller/user.controler.js";
import {loginuser,logoutuser} from "../controller/login.controler.js";
import jwtverify from "../middleware/auth.middleware.js";
import { userdata } from "../controller/userdata.controller.js";

const router=Router();

router.route("/register").post(registereduser);
router.route("/login").post(loginuser);
router.route("/logout").post(jwtverify,logoutuser);
router.route("/user").get(jwtverify,userdata);
export default router;