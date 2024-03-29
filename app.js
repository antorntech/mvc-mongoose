const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const productRoutes = require("./routes/v1/product.route");
const brandRoutes = require("./routes/v1/brand.route");
const categoryRoutes = require("./routes/v1/category.route");
const storeRoutes = require("./routes/v1/store.route");
const supplierRoutes = require("./routes/v1/supplier.route");
const stockRoutes = require("./routes/v1/stock.route");
const userRoutes = require("./routes/v1/user.route");

// middleware
app.use(express.json());
app.use(cors());


// all route will be here
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/brand', brandRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/store', storeRoutes);
app.use('/api/v1/supplier', supplierRoutes);
app.use('/api/v1/stock', stockRoutes);
app.use('/api/v1/user', userRoutes);


// initial api
app.get("/", (req, res)=>{
    res.send("Congratulation! Everything is okay.")
})

module.exports = app;