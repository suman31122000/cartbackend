import User from "../model/user.model.js";

const generateRefreshAndAccessToken=async(userid)=>{
    try{
        const user=await User.findById(userid);
        const accessToken=user.generateAccessToken();
        const refreshToken=user.generateRefreshToken();
        user.refreshToken=refreshToken;
        user.save({validateBeforeSave:false});
        return {accessToken,refreshToken};
    }
    catch(error){
        console.log(error);    
}
} 
const loginuser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).send("user not registered");
        }
        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
          }

          const {accessToken,refreshToken}=await generateRefreshAndAccessToken(user._id);

          const options={
            httpOnly:true,
            secure:true
          }
          user.refreshToken=refreshToken;
          user.save({validateBeforeSave:false});
          return res.status(200)
          .cookie("accessToken",accessToken,options)
          .cookie("refreshToken",refreshToken,options)
          .json({message:"successfully login",accessToken,refreshToken});
    }
    catch(error){
        console.log(error);
    }
}

const logoutuser=async(req,res)=>{
    try{

        const options={
            httpOnly:true,
            secure:true
        }
      const user= await User.findByIdAndUpdate(req.user._id,{refreshToken:undefined});
       user.save({validateBeforeSave:false});
        res.clearCookie("accessToken",options);
        res.clearCookie("refreshToken",options);
        return res.status(200).json({message:"successfully logout"});
    }
    catch(error){
        console.log(error);
    }
}

export  {loginuser,logoutuser};