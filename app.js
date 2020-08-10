const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routes/userRouting');
const productRouter = require('./routes/productRouter');
const productStoreRouter = require('./routes/productStoreRouter');
const errorLogger = require('./utilities/errorLogger');
const requestLogger = require('./utilities/requsetLogger');
const newConnection = require("./config/DbConnection");
var Mongoose = require("mongoose");
const uri =
    "mongodb+srv://Mihir:Mihir%401234@cluster0-kvs47.mongodb.net/SwapDeal?retryWrites=true&w=majority";




newConnection.connect(() => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(requestLogger);
    app.use('/user', userRouter);
    app.use('/product', productRouter);
    app.use('/productStore', productStoreRouter);
    app.use(errorLogger);
    app.listen(3000);
    console.log("Server running on 3000");
});




