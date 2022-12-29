const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide a Product Name"],
        unique: [true, "Product Name Must Be Unique"],
        minLength: [3, "Name At Least 3 Character"],
        maxLength: [100, "Name is Too Large"]
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
        min: [0, "Price can't be negative"]
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs"],
            message: "Unit values must be kg/litre/pcs"
        }
    },
    quantity: {
        type: Number,
        required: [true, "Please Provide Product Quantity"],
        min: [0, "Quantity can't be negative"],
        validate: {
            validator: (value) =>{
                const isInteger = Number.isInteger(value);
                if(isInteger){
                    true
                } else{
                    return false
                }              
            }
        },
        message: "Quantity must be an integer"
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message: "Status can't be {VALUE}"
        }
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
    // updateAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Supplier"
    // },
    // categories: [{
    //     name: {
    //         type: String,
    //         required: true
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }]
},{
    timestamps: true,
})

const Product = mongoose.model('Product', productSchema)

// default-exports
module.exports = Product;  