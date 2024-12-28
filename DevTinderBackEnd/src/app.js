const express = require('express');

const app = express();

// this will catch all user requets nothing will got to get post delete
app.use("/user", (req,res)=> {
    res.send("All request are sent here");
})

app.get("/user", (req,res)=> {
    res.send("User Data Feteched");
})

app.post("/user", (req,res)=> {
    res.send("User created and added to database");
})

app.delete("/user", (req,res)=> {
    res.send("USER deleted successfully");
})

app.listen(3000, () => {
    console.log("server running now");
});