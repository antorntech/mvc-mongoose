const express = require('express');
const app = express.Router();
const brandControllers = require('../../controllers/brand.controller')

app.get('/', brandControllers.allBrand)
app.post('/', brandControllers.createBrand)
app.get('/:id', brandControllers.singleBrand)
app.patch('/:id', brandControllers.brandUpdate)

module.exports = app;