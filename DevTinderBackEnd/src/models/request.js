const mongoose = require("mongoose");
const User = require("../models/users");
const { equals } = require("validator");

const ConnectionRequestSchema = mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["intrested", "ignored", "acepted", "rejected"],
            message: '{VALUE} status is invalud'
        }
    }
}, { timestamps: true });

ConnectionRequestSchema.index({fromUserId: 1, toUserId: 1});
ConnectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Bad Request can not send request to self");
    }
    next();
})

const ConnectionRequestModel = mongoose.model('ConnectionRequest', ConnectionRequestSchema);

module.exports = ConnectionRequestModel;