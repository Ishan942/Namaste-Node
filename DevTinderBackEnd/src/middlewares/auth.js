const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/users");

const adminAuth = (req ,res, next) => {
    const token = "xyz";
    const isAuthorized = token === "xyz";
    if (!isAuthorized) {
        res.status(403).send("You are not an Admin User");
    } else {
        next();
    }
}

const userAuth = async (req ,res, next) => {
    try {
        const {token} = req.cookies;
        if(!token) {
            return res.status(401).send("Token not found");
        }
        const id = await jsonwebtoken.verify(token, 'thisIsMyPrivateKey');
        const user = await User.findOne({_id: id});
        if(!user) {
            throw new Error("Invalid Token");
        }
        req.user = user;
        next();
    } catch(error) {
        res.status(400).send("Error Validating User: "+ error.message);
    }
}



module.exports = {adminAuth, userAuth};