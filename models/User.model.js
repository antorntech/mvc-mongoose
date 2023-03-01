const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        validate: [validator.isEmail, "Please enter a valid email"],
        required: [true, "Please enter your email"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: (value) => {
                validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                })
            }
        },
        message: "Password {VALUE} is not strong enough",
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function(value) {
                return value === this.password;
            },
            message: "Passwords do not match",
        },
    },
    role: {
        type: String,
        enum: ["buyer", "store-manager", "admin"],
        default: "buyer",
    },
    firstName: {
        type: String,
        required: [true, "Please enter your first name"],
        minLength: [2, "First name must be at least 2 characters"],
        maxLength: [100, "First name cannot be more than 100 characters"],
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name"],
        minLength: [2, "Last name must be at least 2 characters"],
        maxLength: [100, "Last name cannot be more than 100 characters"],
    },
    phoneNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please enter a valid phone number"],
    },
    shippingAddress: String,
    imageURL: {
        type: String,
        validate: [validator.isURL, "Please enter a valid URL"],
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive", "blocked"],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,   
},
{
    timestamps: true,
});

userSchema.pre("save", function (next) {
    const password = this.password;
    const hashedPassword = bcrypt.hashSync(password);
    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;