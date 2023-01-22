const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const productRoutes = require("./routes/v1/product.route");
const brandRoutes = require("./routes/v1/brand.route");

// middleware
app.use(express.json());
app.use(cors());


// all route will be here
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/brand', brandRoutes);


// initial api
app.get("/", (req, res)=>{
    res.send("Congratulation! Everything is okay.")
})

module.exports = app;