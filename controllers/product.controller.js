const Product = require('../models/Product.model')

module.exports.allProduct = async (req, res, next) =>{
    try {
        const reqStatus = req.query.status;
        const filters = {...req.query};

        const excludeFields = ['sort', 'page', 'limit'];
        excludeFields.forEach(field=> delete filters[field]);
        
        const result = await Product.find({});
        if(!result){
            return res.status(400).res.send({status: false, error: "Something went wrong"});
        }
        if(reqStatus){
            const result = await Product.find({status: reqStatus})
            return res.send({status: true, data: result})
        }

        // sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            console.log(sortBy);
            const result = await Product.find({}).sort(sortBy);
            return res.send({status: true, data: result})
        }

        // filtering
        if(req.query.fields){
            const fieldsBy = req.query.fields.split(',').join(' ');
            console.log(fieldsBy);
            const result = await Product.find({}).select(fieldsBy);
            return res.send({status: true, data: result})
        }
        res.status(200).json({
            status: 'success',
            message: 'Data find successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data not find',
            error: error
        })
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
        res.status(400).json({
            status: 'fail',
            message: 'Data is not inserted',
            error: error
        })
    }
}

module.exports.updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Product.updateOne({_id: id}, { $set: req.body }, {runValidators: true})

        res.status(200).json({
            status: 'success',
            message: 'Data updated successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data is not updated',
            error: error
        })
    }
}

module.exports.bulkUpdateProduct = async (req, res, next) => {
    try {
        const data = req.body;
        // const result = await Product.updateMany({_id: data.ids}, data.data, {runValidators: true})
        
        const products = [];
        
        data.ids.forEach(product => {
            products.push(Product.updateOne({_id: product.id}, product.data))
        })

        const result = await Promise.all(products);

        res.status(200).json({
            status: 'success',
            message: 'Data updated successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data is not updated',
            error: error
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
            status: 'fail',
            message: 'Data not find',
            error: error
        })
    }
}

module.exports.deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Product.deleteOne({_id: id});

        res.status(200).json({
            status: 'success',
            message: 'Data delete successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data not delete',
            error: error
        })
    }
}

module.exports.bulkDeleteProduct = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await Product.deleteMany({_id: data.ids});

        if(!result.deletedCount){
            return res.status(400).json({
                status: 'fail',
                message: "Couldn't delete the bulk product",
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Bulk Data delete successfully!',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Bulk Data not delete',
            error: error
        })
    }
}
