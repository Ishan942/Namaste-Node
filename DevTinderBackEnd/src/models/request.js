const mongoose = require("mongoose");
const User = require("../models/users");

const ConnectionRequestSchema = mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
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

const ConnectionRequestModel = mongoose.model('ConnectionRequest', ConnectionRequestSchema);

module.exports = ConnectionRequestModel;