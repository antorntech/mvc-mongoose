const Store = require("../models/Store.model");


module.exports.allStore = async (req, res, next) =>{
    try {
        const result = await Store.find({});

        res.status(200).json({
            status: 'success',
            message: 'Store find successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Store could not find',
            error: error
        })
    }
}

module.exports.createStore = async (req, res, next) => {
    try {
        const newStore = req.body;
        const result = await Store.create(newStore);

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

module.exports.singleStore = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await Store.find({_id: id})

        if(!result) {
            res.status(400).json({
                status: 'fail',
                error: 'Could not find the Store with this id'
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

module.exports.storeUpdate = async (req, res, next) => {
    try {
        const {id} = req.params;
        const updateStore = req.body;
        const result = await Store.updateOne({_id: id},  updateStore)

        if(!result.modifiedCount) {
            res.status(400).json({
                status: 'fail',
                error: 'Could not update the Store with this id'
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