const express = require('express');

const app = express();

app.use("/", (req, res) => {
    res.send("this is my first response");
})

app.listen(3000, () => {
    console.log("server running now");
});