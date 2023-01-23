const Category = require("../models/Category.model")

module.exports.allCategory = async (req, res, next) =>{
    try {
        const result = await Category.find({});

        res.status(200).json({
            status: 'success',
            message: 'Category find successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Category could not find',
            error: error
        })
    }
}

module.exports.createCategory = async (req, res, next) => {
    try {
        const newCategory = req.body;
        const result = await Category.create(newCategory);

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

module.exports.singleCategory = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await Category.find({_id: id})

        if(!result) {
            res.status(400).json({
                status: 'fail',
                error: 'Could not find the category with this id'
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

module.exports.categoryUpdate = async (req, res, next) => {
    try {
        const {id} = req.params;
        const updateCategory = req.body;
        const result = await Category.updateOne({_id: id},  updateCategory)

        if(!result.modifiedCount) {
            res.status(400).json({
                status: 'fail',
                error: 'Could not update the category with this id'
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