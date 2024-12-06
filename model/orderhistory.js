import mongoose from "mongoose";

const orderHistorySchema=new mongoose.Schema({
    username:{type:mongoose.Schema.Types.ObjectId,
    ref:"User"},
    totalprice:{type:Number,required:true},
    address:{type:String,required:true},
    
})