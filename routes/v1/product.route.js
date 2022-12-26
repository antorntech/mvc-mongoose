const express = require('express');
const app = express.Router();
const productControllers = require('../../controllers/product.controller')

app.get('/', productControllers.allProduct)
app.post('/', productControllers.createProduct)


module.exports = app;