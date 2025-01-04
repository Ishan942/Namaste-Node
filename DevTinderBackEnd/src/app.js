const express = require('express');
const {connectDB} = require("./config/database");
const User = require("./models/users");

const app = express();

app.post("/signUp",async (req, res) => {

    const user = new User({
        firstName: "Ishan",
        lastName: "Sirdeshpande",
        gender: "male",
        password: "IshanPW",
        age: 17
    });
    try {
        await user.save();
        res.send("User Saved to Database");
    } catch {
        //good to keep db operations in try catch block
        res.status(400).send("Error Adding User TO DB");
    }
})


connectDB().then(() => {
    console.log("DATABASE CONNECTED");
    app.listen(3000, () => {
        console.log("server running now");
    });
}).catch(() => {
    console.log("Error Connecting DB");
})
