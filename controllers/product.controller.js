const Product = require('../models/Product.model')

module.exports.allProduct = async (req, res, next) =>{
    try {
        const result = await Product.find({});
        if(!result){
            return res.status(400).res.send({status: false, error: "Something went wrong"});
        }
        res.send({status: true,  result})
    } catch (error) {
        next(error);
    }
}

module.exports.createProduct = async (req, res, next) => {
    try {
        const newProduct = req.body;
        const result = await Product.create(newProduct);

        res.status(200).json({
            status: 'success',
            message: 'Data inserted successfully!',
            data: result
        })
    } catch (error) {
        next(error);
    }
}

module.exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Product.updateOne({_id: id}, { $set: req.body })

        res.status(200).json({
            status: 'success',
            message: 'Data updated successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: fail,
            message: 'Data is not updated',
            error: error.message
        })
    }
}

module.exports.detailsProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Product.find({_id: id});

        res.status(200).json({
            status: 'success',
            message: 'Data find successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: fail,
            message: 'Data not find',
            error: error.message
        })
    }
}