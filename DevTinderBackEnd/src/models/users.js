const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        min: 4,
        max: 50,
        required: true
    },
    lastName: String,
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "other"].includes(value)) {
                throw new Error("Invalid gender entered");
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    password: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true,
        unique: true
    },
    skills: {
        type: [String]
    },
    photoUrl: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/21/21104.png"
    }
}, {timestamps: true})


const User = mongoose.model("User", userSchema);

module.exports = User;