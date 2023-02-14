const Stock = require('../models/Stock.model')

module.exports.allStock = async (req, res, next) =>{
    try {
        const reqStatus = req.query.status;
        let filters = {...req.query};
        
        let filterString = JSON.stringify(filters);
        filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, match=> `$${match}`);

        filters = JSON.parse(filterString);

        const excludeFields = ['sort', 'page', 'limit'];
        excludeFields.forEach(field=> delete filters[field]);
        
        const result = await Stock.find(filters);
        if(!result){
            return res.status(400).res.send({status: false, error: "Something went wrong"});
        }
        if(reqStatus){
            const result = await Stock.find({status: reqStatus})
            return res.send({status: true, data: result})
        }

        // sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            console.log(sortBy);
            const result = await Stock.find({}).sort(sortBy);
            return res.send({status: true, data: result})
        }

        // filtering
        if(req.query.fields){
            const fieldsBy = req.query.fields.split(',').join(' ');
            console.log(fieldsBy);
            const result = await Stock.find({}).select(fieldsBy);
            return res.send({status: true, data: result})
        }

        // pagination
        if(req.query.page){
            const {page=1, limit=10} = req.query;
            const skip = (page - 1) * parseInt(limit);

            const totalStock = await Stock.countDocuments(filters)
            const totalPage = Math.ceil(totalStock/limit); 

            const result = await Stock.find({}).skip(skip).limit(limit)
            return res.send({status: true, totalStock: totalStock, totalPage: totalPage, data: result})
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

module.exports.createStock = async (req, res, next) => {
    try {
        const newStock = req.body;
        const result = await Stock.create(newStock);

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

module.exports.updateStock = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Stock.updateOne({_id: id}, { $set: req.body }, {runValidators: true})

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

module.exports.bulkUpdateStock = async (req, res, next) => {
    try {
        const data = req.body;
        // const result = await Stock.updateMany({_id: data.ids}, data.data, {runValidators: true})
        
        const stocks = [];
        
        data.ids.forEach(product => {
            stocks.push(Stock.updateOne({_id: product.id}, product.data))
        })

        const result = await Promise.all(stocks);

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

module.exports.detailsStock = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Stock.find({_id: id});

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

module.exports.deleteStock = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Stock.deleteOne({_id: id});

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

module.exports.bulkDeleteStock = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await Stock.deleteMany({_id: data.ids});

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

module.exports.fileUpload = async (req,res,next) =>{
    try {
        
        res.status(200).json({
            status: 'success',
            message: 'File upload successfully!',
            data: req.files
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'File upload failed',
            error: error
        })
    }
}