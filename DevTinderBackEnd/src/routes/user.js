const express = require("express");
const User = require("../models/users");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/request");
const userRouter = express.Router();

const ALLOWED_USER_FIELDS = "firstName lastName gender about skills photoUrl";
userRouter.get("/user/request/recieved", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const requests = await ConnectionRequestModel.find({
            toUserId: loggedInUser,
            status: "intrested"
        }).populate("fromUserId", ALLOWED_USER_FIELDS);
        res.json({data: requests})
    } catch (error) {
        res.status(400).send("Something went wrong");
    }
});

userRouter.get("/user/connections", userAuth, async(req, res) => {
    try {
        const loggedInUser = req.user;
        const requests = await ConnectionRequestModel.find({
            $or: [
                {fromUserId: loggedInUser._id, status: 'acepted'},
                {toUserId: loggedInUser._id, status: 'acepted'}
            ]
        }).populate("fromUserId", ALLOWED_USER_FIELDS).populate("toUserId", ALLOWED_USER_FIELDS);
        // always returning fromUserId causes issue if the request is sent by logged in user, we need to send the details of other connected person
        const data = requests.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });
        res.json({data});
    } catch (error) {
        res.status(400).send("Something went wrong");
    }
});

module.exports = userRouter;