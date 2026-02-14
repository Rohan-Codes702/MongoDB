import mongoose from "mongoose";

const orderItemSchema=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
     quantity:{
        type:Number,
       required:true
    },
})

const orderScehma = new mongoose.Schema(
  {
    orderPrice: {
      type: Number,
      required: true,
    },
    custmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    orderItems: {
      type: [orderItemSchema],
    },
    address: {
      type: String,
      required: true,
    },
    status:{
        type:String,
        enum:["PENDING","CANCELLED","DELETED"],
        default:"PENDING"
    }
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderScehma);
