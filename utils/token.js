const jwt = require("jsonwebtoken");

exports.generateToken = (userInfo) => {
    const payLoad = {
        email: userInfo.email,
        role: userInfo.role,
    }
    const token = jwt.sign(payLoad, process.env.JWT_SECRET,{ 
            expiresIn: "7days", 
        });

    return token;
};