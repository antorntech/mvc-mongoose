const express = require('express');
const app = express.Router();
const stockControllers = require('../../controllers/stock.controller');

app.get('/', stockControllers.allStock)
app.post('/', stockControllers.createStock)
app.patch('/bulk-update', stockControllers.bulkUpdateStock)
app.delete('/bulk-delete', stockControllers.bulkDeleteStock)
app.patch('/:id', stockControllers.updateStock)
app.get('/:id', stockControllers.detailsStock)
app.delete('/:id', stockControllers.deleteStock)

module.exports = app;