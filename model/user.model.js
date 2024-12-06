import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    Phonenumber: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileimage:{
        type:String,
    },
    refreshToken:{
        type:String
    },
    address:{
        type:String
    },
    wallet:{
        type:String,
        default:"0"
    }
},{timestamps:true});



userSchema.pre("save",async function(next) {
    if(!this.isModified("password")) return next;
 this.password = await bcrypt.hash(this.password, 10);
     next();
})

userSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password,this.password)
  }

  userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        id:this._id,
        username:this.username,
        email:this.email,
        coverimage:this.coverimage,
        profileimage:this.profileimage
    },process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY||"1h"});
  }

  userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        id:this._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY|| "1d"});
  }
const Userschema = mongoose.model("Userschema", userSchema);

export default Userschema;