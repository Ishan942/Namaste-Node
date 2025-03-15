const express = require('express');
const {connectDB} = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",  // Your frontend URL
    credentials: true  // Allows browser to accept cookies
}));
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB().then(() => {
    console.log("DATABASE CONNECTED");
    app.listen(3000, () => {
        console.log("server running now");
    });
}).catch(() => {
    console.log("Error Connecting DB");
})
