const express = require('express');

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth");

app.use("/admin", adminAuth)

app.get("/admin/getAllData", (req, res, next) => {
    res.send("ALL ADMIN DATA");
});

app.get("user/login", (req, res) => {
    console.log("No need to auth as user is logging in");
    res.send("Logged in");
})

app.get("/user/data", userAuth, (req, res) => {
    res.send("All user data");
})

app.post("/admin/deletUser", (req, res) => {
    res.send("USER DELETED SUCCESSFULLY");
})

app.get("/queryUser", (req, res) => {
    // http://localhost:3000/queryUser?name=Ishan
    const queryParams = req.query;
    console.log(queryParams);
    res.send("Search Result");
})


app.get("/reqParms/:userId", (req, res) => {
    // http://localhost:3000/reqParms/123
    const userId = req.params.userId;
    res.send(`I am sending the data for user ${userId}`);
})
app.listen(3000, () => {
    console.log("server running now");
});