const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Provide a Product Name"],
        unique: [true, "Product Name Must Be Unique"],
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
    image: [],
    imageURLs: [{
        type: String,
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
    category: {
        type: String,
        required: true
    },
    brand: {
        name: {
            type: String,
        },
        id: {
            type: ObjectId,
            ref: "Brand",
        }
    }
},{
    timestamps: true,
})

const Product = mongoose.model('Product', productSchema)

// default-exports
module.exports = Product;  