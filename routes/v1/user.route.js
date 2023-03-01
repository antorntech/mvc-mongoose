const express = require("express");
const app = express();
const userControllers = require("../../controllers/user.controller");


app.post('/signup', userControllers.signup)
app.post('/login', userControllers.login)

module.exports = app;