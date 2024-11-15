import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
    Phone_number: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    },
});



userSchema.pre("save",async function(next) {
    if(!this.isModified("password")) return next;
 this.password = await bcrypt.hash(this.password, 10);
     next();
})

userSchema.methods.isPasswordCorrect=async function (password) {
    return await bcrypt.compare(password,this.password)
  }
const Userschema = mongoose.model("Userschema", userSchema);

export default Userschema;