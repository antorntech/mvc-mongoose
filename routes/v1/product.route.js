const express = require('express');
const app = express.Router();
const productControllers = require('../../controllers/product.controller')

app.get('/', productControllers.allProduct)
app.post('/', productControllers.createProduct)
app.patch('/bulk-update', productControllers.bulkUpdateProduct)
app.patch('/:id', productControllers.updateProduct)
app.get('/:id', productControllers.detailsProduct)

module.exports = app;