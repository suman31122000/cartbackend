import mongoose from "mongoose";
import user from "./user.model.js";
const produchSchema=new mongoose.Schema({
    username:{type:mongoose.Schema.Types.ObjectId,
    ref:"User"},
    name:{type:String,required:true},
    image:{type:String},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
    rating:{type:Number,required:true},
},{timestamps:true});
const products = mongoose.model("products",produchSchema);
export default  products;