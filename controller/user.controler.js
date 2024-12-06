
import User from "../model/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
const registereduser=async(req,res)=>{
    try {
        console.log(req.body);
        const {username,email,password,phonenumber}=req.body;
        const user=new User({username,email,password,Phonenumber:phonenumber});
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

const userprofile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).send("User not found");
        }

        const profileimage = req.files?.profileimage[0]?.path;

        if (profileimage) {
            try {
                const result = await uploadToCloudinary(profileimage);
                if (!result) {
                    return res.status(400).send("Image not uploaded");
                }
                user.profileimage = result.url;
                await user.save({ validateBeforeSave: false });
                return res.status(200).json({ message: "Profile image updated successfully" });
            } catch (cloudinaryError) {
                console.error(cloudinaryError);
                return res.status(500).send("Error uploading image to Cloudinary");
            }
        } else {
            return res.status(400).send("No profile image provided");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
};



export {registereduser,updateuseraddress,userprofile};