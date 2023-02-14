const express = require('express');
const app = express.Router();
const supplierControllers = require('../../controllers/supplier.controller')

app.get('/', supplierControllers.allSupplier)
app.post('/', supplierControllers.createSupplier)
app.get('/:id', supplierControllers.singleSupplier)
app.patch('/:id', supplierControllers.supplierUpdate)

module.exports = app;