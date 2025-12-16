import mongoose from "mongoose";
import bcrypt from "bcrypt";

await mongoose.connect("mongodb://localhost:27017/Hashing_DB");

const userSchema=new mongoose.Schema({
    name:String,
    password:String,
    CreatedAt:{type:Date, default:Date.now()}
});

userSchema.pre("save", async function(next) {
    console.log("Hashing password...");
    this.password=await bcrypt.hash(this.password,10);
    
})

const user=mongoose.model("user",userSchema);
await user.create({name:"Rohan",password:"12345"});
await user.create({name:"Pratik",password:"123"});
mongoose.connection.close();