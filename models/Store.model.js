const mongoose = require('mongoose');
const validator = require('validator');
const {ObjectId} = mongoose.Schema.Types;

const storeSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        lowercase: true,
        enum: {
            values: ['dhaka', 'chattrogram', 'rajshahi', 'khulna', 'barishal', 'rangpur', 'mymensingh', 'sylhet'],
            message: "{VALUE} is not a valid name",
        },
        required: [true, 'Please provide a store name'],
    },
    description: String,
    manager: [{
        id: {
            type: ObjectId,
            ref: "User"
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

const Store = mongoose.model('Store', storeSchema);

// default-exports
module.exports = Store;  