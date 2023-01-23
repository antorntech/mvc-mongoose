const express = require('express');
const app = express.Router();
const storeControllers = require('../../controllers/store.controller')

app.get('/', storeControllers.allStore)
app.post('/', storeControllers.createStore)
app.get('/:id', storeControllers.singleStore)
app.patch('/:id', storeControllers.storeUpdate)

module.exports = app;