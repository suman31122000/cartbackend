import User from "../model/user.model.js";
const 
userdata=async(req,res)=>{
    try{
        const user=await User.findById(req.user._id);
        console.log(user);
        return res.status(200).json({user:user.username,email:user.email,profileimage:user.profileimage,address:user.address,phone:user.Phonenumber});
    }
    catch(error){
        console.log(error);
    }
    }
    export  {userdata};