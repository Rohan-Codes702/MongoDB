import mongoose from "mongoose";

try {
    await mongoose.connect("mongodb://localhost:27017/Mongoose_middleware");
    mongoose.set("debug", true);
    console.log("MongoDB Connected");
} catch (error) {
    console.log(error);
}

// Schema
const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true, min: 5 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Middleware to auto-update updatedAt for update operations
schema.pre(["updateOne", "updateMany", "findOneAndUpdate"], function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});

const User = mongoose.model("User", schema);

// Example update
await User.updateOne(
    { age: 20 },
    { $set: { name: "Shubham" } }
);

mongoose.connection.close();
