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
        res.status(400).send("Something went wrong ",error);
    }
});

userRouter.get("/feed", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequestModel.find({
            $or: [{fromUserId: loggedInUser._id}, {toUserId: loggedInUser._id}]
        }).select("toUserId fromUserId");
        const hideUsers = new Set();
        connectionRequests.forEach(connection => {
            hideUsers.add(connection.fromUserId.toString());
            hideUsers.add(connection.toUserId.toString());
        });
        const users = await User.find({
            $and : [
                {_id: {$nin: Array.from(hideUsers)}},
                {_id: {$ne: loggedInUser._id}}
            ]
        }).select(ALLOWED_USER_FIELDS);

        res.json({users: users});

    } catch(error) {
        res.status(400).json({message: error});
    }
})
module.exports = userRouter;