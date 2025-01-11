const express = require("express");
const {userAuth} = require("../middlewares/auth")


const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest",userAuth,  async (req, res) => {
    try{
        const fName = req.user.firstName;
        console.log("Connection request sent");
        res.send(fName+ " sent a connection request");
    } catch(error) {
        res.status(400).send("Error Validating User: "+ error.message);
    }
});

module.exports = requestRouter;