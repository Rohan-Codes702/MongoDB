import mongoose from 'mongoose';

try{
await mongoose .connect("mongodb://localhost:27017/mongoose_db");
mongoose.set("debug",true);

}catch(error){
    console.log(error);
}


const userSchema=mongoose.Schema({

    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    age:{type:Number,required:true,min:5},
    createdAt:{type:Date,default:Date.now()}
});

const user =mongoose.model("user",userSchema);

// await user.create({name:"thapa",age:21,email:"ABC@gmail.com"});
// await user.create({name:"Rohan",age:20,email:"BC@gmail.com"});
// await user.create({name:"Shubham",age:22,email:"AC@gmail.com"});
// await user.create({name:"pratik",age:23,email:"A@gmail.com"});
//await user.deleteMany({});

await user.updateOne({name:"Rohan"},{$set:{age:21}});
console.log(await user.find());

await  mongoose.connection.close();
