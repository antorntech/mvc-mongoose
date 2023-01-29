const express = require('express');
const app = express.Router();
const productControllers = require('../../controllers/product.controller');
const uploader = require('../../middleware/uploader');


app.post("/file-upload", uploader.array("image"), productControllers.fileUpload)

app.get('/', productControllers.allProduct)
app.post('/', uploader.array("image"), productControllers.createProduct)
app.patch('/bulk-update', productControllers.bulkUpdateProduct)
app.delete('/bulk-delete', productControllers.bulkDeleteProduct)
app.patch('/:id', productControllers.updateProduct)
app.get('/:id', productControllers.detailsProduct)
app.delete('/:id', productControllers.deleteProduct)

module.exports = app;