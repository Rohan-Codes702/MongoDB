import mongoose from "mongoose";

await mongoose.connect("mongodb://localhost:27017/Login_middleware");

const Schema=new mongoose.Schema({
    name:String,
    age:Number,
    createdAt:{type:Date}
});

Schema.pre("find",function(next){
    console.log("Fetching data using find()")
})

const model=mongoose.model("user",Schema);

await model.create({ name: "Rohan", age: 21 });
await model.create({ name: "Shubham", age: 25 });

const users=await model.find();

console .log("Users:",users);


mongoose.connection.close();