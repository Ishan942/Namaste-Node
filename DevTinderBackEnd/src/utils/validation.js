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

module.exports = {validateSignupData}