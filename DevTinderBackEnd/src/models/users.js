const mongoose = require("mongoose");
const validators = require("validator");

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
        required: true,
        validate(value) {
            if(!validators.isStrongPassword(value)) {
                throw new Error("Password not Strong Enough");
            }
        }
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        validate(value) {
            if(!validators.isEmail(value)) {
                throw new Error("Invalid Email" + value);
            }
        }
    },
    skills: {
        type: [String]
    },
    photoUrl: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/21/21104.png",
        validate(value) {
            if(!validators.isURL(value)) {
                throw new Error("Invalid URL" + value);
            }
        }
    }
}, {timestamps: true})


const User = mongoose.model("User", userSchema);

module.exports = User;