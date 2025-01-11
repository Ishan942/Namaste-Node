const express = require("express");
const User = require("../models/users");
const userRouter = express.Router();

userRouter.get("/feed", async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.send(allUsers);
    } catch (error) {
        res.status(404).send("Something went wrong");
    }
});

module.exports = userRouter;