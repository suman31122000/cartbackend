import User from "../model/user.model.js";

const loginuser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const demail=await User.findOne({email});
        if(!demail){
            return res.status(400).send("user not registered");
        }
        const isPasswordValid = await demail.isPasswordCorrect(password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
          }
          return res.status(200).send("successfully login");
    }
    catch(error){
        console.log(error);
    }
}

export default loginuser;