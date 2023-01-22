const Brand = require("../models/Brand.model");

module.exports.allBrand = async (req, res, next) => {
    try {
        const result = await Brand.find({});

        res.status(200).json({
            status: 'success',
            message: 'Data find successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data is not find',
            error: error
        })
    }
}

module.exports.createBrand = async (req, res, next) => {
    try {
        const newBrand = req.body;
        const result = await Brand.create(newBrand);

        res.status(200).json({
            status: 'success',
            message: 'Data inserted successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data is not inserted',
            error: error
        })
    }
}