const express = require('express');
const app = express.Router();
const categoryControllers = require('../../controllers/category.controller')

app.get('/', categoryControllers.allCategory)
app.post('/', categoryControllers.createCategory)
app.get('/:id', categoryControllers.singleCategory)
app.patch('/:id', categoryControllers.categoryUpdate)

module.exports = app;