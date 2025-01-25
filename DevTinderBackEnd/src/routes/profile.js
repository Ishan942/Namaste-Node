const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const validators = require("validator");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        res.json({data: req.user});
    } catch (error) {
        res.status(400).json({message: "Something Went Wrong " + error});
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Not Allowed to Update")
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key]);
        await loggedInUser.save();
        res.json({ message: `${loggedInUser.firstName} User Updated Successfully`, data: loggedInUser });
    } catch (error) {
        res.status(400).json({message: "Something Went Wrong " + error});
    }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = req.user;
        const isPasswordValid = await user.validatePassword(oldPassword);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        if(!validators.isStrongPassword(newPassword)) {
            throw new Error("New Password Not Strong Enough");
        }
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        user['password'] = newHashedPassword;
        await user.save();
        res.json({message: "Password updated successfully"});
    } catch (error) {
        res.status(400).json({message: "Something Went Wrong " + error});
    }
});

profileRouter.delete("/user", async (req, res) => {
    try {
        const userId = req.body.userId;
        await User.findOneAndDelete({ _id: userId });
        res.josn({message: "User Deleted Successfully"});
    } catch (error) {
        res.status(400).json({message: "Something Went Wrong " + error});
    }
});

module.exports = profileRouter;