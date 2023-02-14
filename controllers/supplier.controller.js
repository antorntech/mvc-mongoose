const Supplier = require("../models/Supplier.model");

module.exports.allSupplier = async (req, res, next) =>{
    try {
        const result = await Supplier.find({});

        res.status(200).json({
            status: 'success',
            message: 'Supplier find successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Supplier could not find',
            error: error
        })
    }
}

module.exports.createSupplier = async (req, res, next) => {
    try {
        const newSupplier = req.body;
        const result = await Supplier.create(newSupplier);

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

module.exports.singleSupplier = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await Supplier.find({_id: id})

        if(!result) {
            res.status(400).json({
                status: 'fail',
                error: 'Could not find the Supplier with this id'
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

module.exports.supplierUpdate = async (req, res, next) => {
    try {
        const {id} = req.params;
        const updateSupplier = req.body;
        const result = await Supplier.updateOne({_id: id},  updateSupplier)

        if(!result.modifiedCount) {
            res.status(400).json({
                status: 'fail',
                error: 'Could not update the Supplier with this id'
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