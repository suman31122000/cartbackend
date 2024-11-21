import products from "../model/product.model.js";
const addproduct=async(req,res)=>{
    try{
        const {name,image,description,price,quantity,rating}=req.body;
        const product=await products.create({username:req.user._id,name,image,description,price,quantity,rating});
        console.log(product);
        return res.status(201).json({message:"product added successfully"});
    }
    catch(error){
        console.log(error);
    }
}
export {addproduct};