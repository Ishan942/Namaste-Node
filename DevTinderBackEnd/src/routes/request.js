const express = require("express");
const {userAuth} = require("../middlewares/auth")
const ConnectionRequest = require("../models/request");

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
        const data = await connectionRequest.save();
        res.json({
            message: "Connection request updated to "+ status ,
            data
        })

    } catch(error) {
        res.status(400).send("Error Validating User: "+ error.message);
    }
});

module.exports = requestRouter;