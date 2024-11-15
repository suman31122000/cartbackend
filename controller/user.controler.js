
import User from "../model/user.model.js";
const registereduser=async(req,res)=>{
    try {
        const {username,email,password,confirmPassword}=req.body;
        const user=new User({username,email,password});
        const userExists=await User.findOne({$or:[{username},{email}]});
    if(userExists){
        return res.status(400).send("User already exists");
    }
        if (!username || !email) {
            return res.status(400).send("Either username or email is invalid");
          }
        if(!email.includes("@gmail.com")){
            return res.status(400).send("email is invalid");
        }
        if(password!=confirmPassword){
            return res.status(400).send("password not match");
        }
       const data= await user.save();
       console.log(data);
       return res.status(201).json({message:"user registered successfully"});
    } catch (error) {
        console.log(error);
    }
}

export {registereduser};