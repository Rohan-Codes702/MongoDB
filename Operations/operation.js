import {MongoClient} from "mongodb";

const client=new MongoClient("mongodb://localhost:27017");

await client.connect();

const db=client.db("mydb");
const collection=db.collection("mycollection");

collection.insertOne({id:1,name:"Rohan",Branch:"CSE",City:"Sangola",age:21});
collection.insertMany([
    {id:2,name:"Pratik",Branch:"CSE",City:"Kagal",age:21},
    {id:3,name:"Pruthviraj",Branch:"CSE",City:"Sangli",age:22}, 
    {id:4,name:"Pranav",Branch:"CSE",City:"Kolhapur",age:23},
    {id:5,name:"Aditya",Branch:"CSE",City:"Jaysingpur",age:24},
    {id:6,name:"Nitish",Branch:"Mech",City:"Sangola",age:25}
]);


console .log(await collection.find ().toArray());

console.log(await collection.find({name:"Rohan"}).toArray());
collection.updateOne({name:"Rohan"},{$set:{age:20}});

collection.updateMany({age:{$gte:21}},{$set:{ststus:"Active"}});