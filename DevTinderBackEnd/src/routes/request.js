const express = require("express");
const {userAuth} = require("../middlewares/auth")
const ConnectionRequest = require("../models/request");
const User = require("../models/users");
const ConnectionRequestModel = require("../models/request");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:userId",userAuth,  async (req, res) => {
    try{
        const toUserId = req.params.userId;
        const fromUserId = req.user._id;
        const status = req.params.status;

        const connectionRequest = new ConnectionRequest({
            toUserId,
            fromUserId,
            status
        });
        // if allowed status code is not valid
        const ALLOWED_STATUS = ["intrested", "ignored"];
        if(!ALLOWED_STATUS.includes(status)) {
            return res.status(400).json({
                message: 'Invalid Status Type'
            });
        }
        // if toUserId is not valid
        const toUser = await User.findOne({_id: toUserId});
        if(!toUser) {
            return res.status(404).json({
                message: 'User Does Not Exists'
            });
        }
        // if connection request already exists
        const existingRequest =  await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        })
        if(existingRequest) {
            return res.status(400).json({
                message: 'Connection Already Exists'
            })
        }
        const data = await connectionRequest.save();
        res.json({
            message: "Connection request updated to "+ status ,
            data
        });

    } catch(error) {
        res.status(400).send("Error: "+ error.message);
    }
});

requestRouter.post("/request/review/:status/:reqId", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;
        const {status, reqId} = req.params;
        const ALLOWED_STATUS = ['acepted', 'rejected'];
        if(!ALLOWED_STATUS.includes(status)) {
            res.status(400).json({ message: "Error: Cannot Send Request"});
            return;
        }
        const connectionRequest = await ConnectionRequestModel.findOne({
            _id: reqId,
            toUserId: loggedInUser._id,
            status: "intrested"
        });
        if(!connectionRequest) {
            res.status(404).json({message: "Error: Request Not Found"});
            return;
        }
        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.status(200).json({
            message: "Connection Updated Successfully",
            data: data
        });
    } catch(error) {
        res.status(400).send("Error: "+ error.message);
    }

});

module.exports = requestRouter;