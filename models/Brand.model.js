const mongoose = require('mongoose');
const validator = require('validator');
const {ObjectId} = mongoose.Schema.Types;

const brandSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        unique: true,
        maxLength: 100,
        lowercase: true,
        required: [true, 'Please provide a brand name'],
    },
    description: String,
    email: {
        type: String,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    website: {
        type: String,
        validate: [validator.isURL, 'Please provide a valid url']
    },
    location: String,
    products: [{
        type: ObjectId,
        ref: "Product"
    }],
    suppliers: [{
        id: {
            type: ObjectId,
            ref: "Supplier"
        },
        name: String,
        phone: String
    }],
    status: {
        type: String,
        enum: ['active', "inactive"],
        default: 'active'
    }
},{
    timestamps: true,
})

const Brand = mongoose.model('Brand', brandSchema);

// default-exports
module.exports = Brand;  