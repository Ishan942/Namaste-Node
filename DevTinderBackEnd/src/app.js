const express = require('express');
const {connectDB} = require("./config/database");
const User = require("./models/users");
const {validateSignupData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const {userAuth} = require("./middlewares/auth")
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signUp",async (req, res) => {
    try {
        validateSignupData(req);
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        const {firstName, lastName, password, emailId} = req.body;
        const user = new User({
            firstName,
            lastName,
            password: passwordHash,
            emailId
        });
        // only allow four fields while signup rest fields will be ignored in this way
        await user.save();
        res.send("User Saved to Database");
    } catch(err) {
        res.status(400).send("Error Adding User: "+ err.message);
    }
})

app.post("/login",async (req, res) => {
    try {
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user) {
            throw new Error("Invalid credentials");
        }
        const isValidPassword = await  user.validatePassword(password);
        if(!isValidPassword) {
            throw new Error("Invalid credentials");
        } else {
            const token = await user.getJwt();
            res.cookie('userCookie', token);
            res.send("Log in successful");
        }
    }
    catch(error) {
        res.status(400).send("Error Validating User: "+ error.message);
    }
})

app.get("/user",userAuth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (error) {
        res.status(400).send("Error Validating User: "+ error.message);
    }
});

app.post("/sendConnectionRequest",userAuth,  async (req, res) => {
    try{
        const fName = req.user.firstName;
        console.log("Connection request sent");
        res.send(fName+ " sent a connection request");
    } catch(error) {
        res.status(400).send("Error Validating User: "+ error.message);
    }
})
app.get("/feed", async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.send(allUsers);
    } catch (error) {
        res.status(404).send("Something went wrong");
    }
})

app.delete("/user", async (req, res) => {
    try {
        const userId= req.body.userId;
        await User.findOneAndDelete({_id: userId});
        res.send("User Deleted Successfully");
    } catch(err) {
        res.status(404).send("Something went wrong");
    }
});

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body.data;
    try {
        const ALLOWED_UPDATES = ["firstName", "age", "gender", "photoUrl", "skills"];
        const shouldAllowUpdate = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if(!shouldAllowUpdate) {
            throw new Error("Not Allowed to Update")
        }
        if(data?.skills?.length > 10) {
            throw new Error("Not Allowed To Update More than 10 Skills");
        }
        const beforeUpdateValue = await User.findByIdAndUpdate(userId, data, {returnDocument: "before", runValidators: true});
        res.send("User Updated Successfully");
    } catch (err) {
        res.status(404).send(err.message);
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
