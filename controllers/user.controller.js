const User = require("../models/User.model");

module.exports.signup = async (req, res, next) => {
    try {
        const newUser = req.body;
        if (!newUser.firstName || !newUser.lastName || !newUser.phoneNumber || !newUser.password || !newUser.confirmPassword) {
            return res.status(400).json({
                message: "Please enter necessary fields",
            });
        }
        if (newUser.password !== newUser.confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
            });
        }
        const userEmail = await User.findOne({ email: newUser.email });
        if (userEmail) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }
        const createdUser = await User.create(newUser);
        
        res.status(201).json({
            status: 'success',
            message: 'User created successfully!',  
            data: createdUser
        })
        
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'User not created',
            error: error
        })
    }
}

/**
 * 1.Check if user exists by email
 * 2.Compare password entered by user with password in database
 * 3.Check if user is active
 * 4.Generate a token
 * 5.Send token to user
 */

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter necessary fields",
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'User not logged in',
            error: error
        })
    }
}