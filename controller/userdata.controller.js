import User from "../model/user.model.js";
const userdata=async(req,res)=>{
    try{
        const user=await User.findById(req.user._id);
        return res.status(200).json({user:user.username,email:user.email,profileimage:user.profileimage,coverimage:user.coverimage,address:user.address});
    }
    catch(error){
        console.log(error);
    }
    }
    export  {userdata};