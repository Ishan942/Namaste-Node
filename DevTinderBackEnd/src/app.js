const express = require('express');

const app = express();

app.use("/admin", (req ,res, next) => {
    const token = "xyz";
    const isAuthorized = token === "xyz";
    console.log("admin route is getting checked");
    if (!isAuthorized) {
        res.status(403).send("You are not an Admin User");
    } else {
        next();
    }
})

app.get("/admin/getAllData", (req, res, next) => {
    res.send("ALL ADMIN DATA");
});

app.post("/admin/deletUser", (req, res) => {
    res.send("USER DELETED SUCCESSFULLY");
})



app.listen(3000, () => {
    console.log("server running now");
});