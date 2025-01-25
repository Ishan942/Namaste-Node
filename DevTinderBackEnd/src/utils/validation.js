const validators = require("validator");

const validateSignupData = (req) => {
    const {firstName, lastName, password, emailId} = req.body;
    if (!firstName || !lastName) {
        throw new Error("Enter a valid name");
    }
    if (!validators.isEmail(emailId)) {
        throw new Error("Email is not valid");
    }
    if(!validators.isStrongPassword(password)) {
        throw new Error("Password not strong enough");
    }
}

const validateEditProfileData = (req) => {
    const ALLOWED_UPDATES = ["firstName", "lastName", "age", "gender", "photoUrl", "skills", "about"];
    const isUpdateAllowed = Object.keys(req.body).every((k) => ALLOWED_UPDATES.includes(k)) && !(req.body.skills?.length > 10);
    return isUpdateAllowed;
}
module.exports = {validateSignupData, validateEditProfileData}