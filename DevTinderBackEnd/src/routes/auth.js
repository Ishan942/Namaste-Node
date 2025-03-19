const express = require("express");
const {validateSignupData} = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/users");
const {ALLOWED_USER_FIELDS} = require("./user")

const authRouter = express.Router();

authRouter.post("/signUp",async (req, res) => {
    try {
        validateSignupData(req);
        const {firstName, lastName, password, emailId} = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            password: passwordHash,
            emailId
        });
        // only allow four fields while signup rest fields will be ignored in this way
        const saveduser = await user.save();
        const token = await saveduser.getJwt();
        res.cookie('token', token);
        res.json({message: "User Saved to Database", user: saveduser});
    } catch(err) {
        res.status(400).send("Error Adding User: "+ err.message);
    }
})

authRouter.post("/login",async (req, res) => {
    try {
        console.log(req.body);
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
            res.cookie('token', token);
            res.json({ message: "Log in successful", user: user});
        }
    }
    catch(error) {
        res.status(400).send("Error Validating User: "+ error.message);
    }
})

authRouter.post("/logout", (req, res) => {
    res.cookie('token', null , {
        expires: new Date(Date.now())
    })
    res.json({message: "Logout Successful"});
});

module.exports = authRouter;