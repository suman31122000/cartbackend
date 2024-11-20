import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

    const jwtverify=async(req,res,next)=>{
        try{
    
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
        // console.log(token);
        if(!token){
            throw new Error("token not found");
        }
        const decodedtoken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        if(!decodedtoken){
            console.log("token is invalid");
        } 
        const user=await User.findById(decodedtoken.id).select("-password -refreshToken");

        if(!user){
            throw new Error("user not found");
        }
        req.user=user;
        next();
    }
    catch(error){
        res.status(401).send(error.message);
    }
}
export default jwtverify;