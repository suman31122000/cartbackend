import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
const Payment = async(req,res)=>{
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, 
    key_secret: process.env.RAZORPAY_KEY_SECRET, 
  });

  const { amount, currency, receipt } = req.body;

  try {
    const options = {
      amount: amount, // Amount in paise
      currency: currency || "INR",
      receipt: receipt || "receipt#1",
      notes:
      {user: req.username,
      email: req.email,
      phonenumber: req.phonenumber}

    };
    const order = await razorpay.orders.create(options);
    if(!order){
      return res.status(400).send("order not created");
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
}

export  {Payment};


// const express = require("express");
// const Razorpay = require("razorpay");

// const app = express();
// app.use(express.json());

// // Razorpay Instance
// const razorpay = new Razorpay({
//   key_id: "rzp_test_yourKeyHere", // Replace with your Razorpay Key ID
//   key_secret: "yourKeySecretHere", // Replace with your Razorpay Key Secret
// });

// // Endpoint to Create Order
// app.post("/create-order", async (req, res) => {
//   const { amount, currency, receipt } = req.body;

//   try {
//     const options = {
//       amount: amount * 100, // Amount in paise
//       currency: currency || "INR",
//       receipt: receipt || "receipt#1",
//     };

//     const order = await razorpay.orders.create(options);
//     res.status(200).json(order);
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ error: "Failed to create order" });
//   }
// });

// // Start Server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
