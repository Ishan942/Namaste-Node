const express = require('express');

const app = express();

// this will catch all user requets nothing will got to get post delete
app.get("/user", (req, res, next) => {
    console.log("this is the first method called");
    next();
})

app.get("/user", (req, res, next) => {
    console.log("this does not throw an error");
    res.send("this is response that postman will show does not go to the next request handler ");
})

app.get("/user", (req, res, next) => {
    console.log("this is the second method call");
    next();
    console.log("this throws error here");
    // this searches for next matching route but it does not find one so throws error on postman
})

app.listen(3000, () => {
    console.log("server running now");
});