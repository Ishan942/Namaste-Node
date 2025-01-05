const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
await mongoose.connect(process.env.MONGO_URI);
await mongoose.connection.syncIndexes();
};




module.exports = {connectDB};


