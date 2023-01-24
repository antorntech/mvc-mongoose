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

module.exports.singleBrand = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await Brand.find({_id: id})

        if(!result) {
            res.status(400).json({
                status: 'fail',
                error: 'Could not find the brand with this id'
            })
        }

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

module.exports.brandUpdate = async (req, res, next) => {
    try {
        const {id} = req.params;
        const updateBrand = req.body;
        const result = await Brand.updateOne({_id: id},  updateBrand)

        if(!result.modifiedCount) {
            res.status(400).json({
                status: 'fail',
                error: 'Could not update the brand with this id'
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Data update successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data is not update',
            error: error
        })
    }
}