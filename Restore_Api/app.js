const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// DB Connection
try {
    mongoose.connect("mongodb://127.0.0.1:27017/RestoreAPI_DB");
    console.log("Mongodb connected");
}
catch (error) {
    console.log(error);
}

// Schema
const scehma = mongoose.Schema({
    name: String,
    email: String,   
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }
});

// Middleware - hide deleted users
scehma.pre(/^find/, function (next) {
    this.where({ isDeleted: false });
     
});

const User = mongoose.model("user", scehma);


app.post("/user", async (req, res) => {
    const data = await User.create(req.body); 
    res.json(data);
});

app.get("/user/all", async (req, res) => {
    const users = await User.find().select("+isDeleted +deletedAt").lean(); 
   
    res.json(users);
});


app.delete("/user/:id", async (req, res) => {
    const data = await User.findById(req.params.id);

    if (!data) return res.status(404).json({ message: "User not found" });

    data.isDeleted = true;
    data.deletedAt = new Date();

    await data.save();
    res.json({ Message: "User Deleted" });
});


app.patch("/user/restore/:id", async (req, res) => {
    const data = await User.findById(req.params.id).select("+isDeleted +deletedAt");

    if (!data) return res.status(404).json({ message: "User not found" });

    if (!data.isDeleted) {
        return res.json({ message: "User is already active" });
    }

    data.isDeleted = false;
    data.deletedAt = null;

    await data.save();
    res.json({ message: "User Restored Successfully" });
});


app.delete("/user/hard/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User Permanently Deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
