const express = require('express');
const path = require('path');
const dotenv = require("dotenv").config();
const mongoose = require('mongoose');
const connectDb = require('./configs/dbConnection');
const errorHandler = require('./middleware/errorHandler')

// connect to db
connectDb();

// init app
var app = express();

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/api/contacts', require("./routes/contactRoutes"));
app.use(errorHandler);

// start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})