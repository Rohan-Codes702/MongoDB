import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    city: {
      type: strign,
      default: 0,
    },
    pincode: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const hospitalRecord = mongoose.model("hospitalRecord", doctorSchema);
