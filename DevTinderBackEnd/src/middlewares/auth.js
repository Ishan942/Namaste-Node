const adminAuth = (req ,res, next) => {
    const token = "xyz";
    const isAuthorized = token === "xyz";
    console.log("admin route is getting checked");
    if (!isAuthorized) {
        res.status(403).send("You are not an Admin User");
    } else {
        next();
    }
}

const userAuth = (req ,res, next) => {
    const token = "xyz";
    const isAuthorized = token === "xyz";
    console.log("user route is getting checked");
    if (!isAuthorized) {
        res.status(403).send("You are not an Admin User");
    } else {
        next();
    }
}



module.exports = {adminAuth, userAuth};