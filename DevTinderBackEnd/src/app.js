const express = require('express');

const app = express();
// express goes on checking every regex till it does not send any response back to server , if it finds a matching handler but it does not send any 
// response back then also express goes on matching if the handler has next method in it if it does not then the request hangs till time outs
// this will catch all user requets nothing will got to get post delete
app.get("/user", (req, res, next) => {
    console.log("this is the first method called");
    // this request will hang till timeout occurs
    // no error on postman or the console
})



app.listen(3000, () => {
    console.log("server running now");
});