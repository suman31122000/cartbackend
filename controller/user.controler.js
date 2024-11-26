
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
       const data= await user.save();
       console.log(data);
       return res.status(201).json({message:"user registered successfully"});
    } catch (error) {
        console.log(error);
    }
}
const updateuseraddress=async(req,res)=>{
    try {
        const user=await User.findById(req.user._id);
        if(!user){
            return res.status(400).send("user not found");
        }
        const {address}=req.body;
        user.address=address;
        await user.save({validateBeforeSave:false});
        console.log(user);
        return res.status(200).json({message:"address updated successfully"});
    } catch (error) {    
        console.log(error);
    }
}

const userprofile=async(req,res)=>{
    try {
        const user=await User.findById(req.user._id);
        if(!user){
            return res.status(400).send("user not found");
        }
        const {profileimage}=req.files?.profileimage[0]?.path;
        user.profileimage=profileimage;
        await user.save({validateBeforeSave:false});
        console.log(user);
        return res.status(200).json({message:"profile image updated successfully"});
    } catch (error) {    
        console.log(error);
    }
}


export {registereduser,updateuseraddress,userprofile};