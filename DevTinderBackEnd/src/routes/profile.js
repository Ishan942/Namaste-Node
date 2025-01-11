const express = require("express");
const {userAuth} = require("../middlewares/auth")
const User = require("../models/users");

const profileRouter = express.Router();

profileRouter.get("/profile",userAuth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (error) {
        res.status(400).send("Error Validating User: "+ error.message);
    }
});

profileRouter.patch("/profile/:userId", async (req, res) => {
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
});

profileRouter.delete("/user", async (req, res) => {
    try {
        const userId= req.body.userId;
        await User.findOneAndDelete({_id: userId});
        res.send("User Deleted Successfully");
    } catch(err) {
        res.status(404).send("Something went wrong");
    }
});

module.exports = profileRouter;