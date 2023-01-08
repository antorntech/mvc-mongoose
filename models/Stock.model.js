const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const stockSchema = mongoose.Schema({
    productId: {
        type: ObjectId,
        required: true,
        ref: 'Product'
    },
    name: {
        type: String,
        required: [true, "Please Provide a Stock Name"],
        unique: [true, "Stock Name Must Be Unique"],
        minLength: [3, "Name At Least 3 Character"],
        maxLength: [100, "Name is Too Large"],
        lowercase: true
    },
    description:{
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs", "bag"],
            message: "Unit values must be kg/litre/pcs/bag"
        }
    },
    imageURLs: [{
        type: String,
        required: true,
        validate: {
            validator: (value) =>{
                if(!Array.isArray(value)){
                    return false;
                }
                let isValid = true;
                value.forEach(url => {
                    if(!validator.isURL(url)){
                        isValid = false;
                    }
                });
                return isValid;
            },
            message: "Please provide valid image urls"
        }
    }],
    price: {
        type: Number,
        required: true,
        min: [0, 'Product price must be positive']
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Product quantity must be positive']
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: ObjectId,
            ref: "Brand",
            required: true
        }
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['in-stock', 'out-of-stock', 'discontinued'],
            message: "status can't be {VALUE}"
        }
    },
    store: {
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
        id: {
            type: ObjectId,
            required: true,
            ref: 'Store'
        }
    },
    suppliedBy: {
        name: {
            type: String,
            required: [true, "Please Provide a Stock Name"],
            trim: true,
        },
        id: {
            type: ObjectId,
            ref: 'Supplier'
        }
    }
},{
    timestamps: true,
})

const Stock = mongoose.model('Stock', stockSchema)

// default-exports
module.exports = Stock;  