const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    age: Number,
    password: String
})


const User = mongoose.model("User", userSchema);

module.exports = User;