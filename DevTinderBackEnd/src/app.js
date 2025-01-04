const express = require('express');
const {connectDB} = require("./config/database");
const User = require("./models/users");

const app = express();

app.use(express.json());

app.post("/signUp",async (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User Saved to Database");
    } catch {
        //good to keep db operations in try catch block
        res.status(400).send("Error Adding User TO DB");
    }
})

app.get("/getUser",async (req, res) => {
    const userEmail = req.body.emailId;
    console.log(userEmail);
    try {
        const user = await User.find({emailId: userEmail});
        res.send(user);
    } catch (error) {
        res.status(404).send("Something went wrong");
    }
});

app.get("/getAll", async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.send(allUsers);
    } catch (error) {
        res.status(404).send("Something went wrong");
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
