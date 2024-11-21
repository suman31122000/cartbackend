import { Router } from "express";
import { registereduser, updateuseraddress } from "../controller/user.controler.js";
import {loginuser,logoutuser} from "../controller/login.controler.js";
import jwtverify from "../middleware/auth.middleware.js";
import { userdata } from "../controller/userdata.controller.js";
import { addproduct } from "../controller/product.controller.js";

const router=Router();

router.route("/register").post(registereduser);
router.route("/login").post(loginuser);
router.route("/logout").post(jwtverify,logoutuser);
router.route("/user").get(jwtverify,userdata);
router.route("/updateaddress").post(jwtverify,updateuseraddress);
router.route("/addproduct").post(jwtverify,addproduct);
export default router;