const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routes/userRouting');
const productRouter = require('./routes/productRouter');
const errorLogger = require('./utilities/errorLogger');
const requestLogger = require('./utilities/requsetLogger');

app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);
app.use('/user',userRouter);
app.use('/product', productRouter)
app.use(errorLogger);
app.listen(3000);

console.log("Server running on 3000");