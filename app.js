const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const productRoutes = require("./routes/v1/product.route");
const brandRoutes = require("./routes/v1/brand.route");
const categoryRoutes = require("./routes/v1/category.route");
const storeRoutes = require("./routes/v1/store.route");

// middleware
app.use(express.json());
app.use(cors());


// all route will be here
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/brand', brandRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/store', storeRoutes);


// initial api
app.get("/", (req, res)=>{
    res.send("Congratulation! Everything is okay.")
})

module.exports = app;