const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./routes/userRouting');
const productRouter = require('./routes/productRouter');
const errorLogger = require('./utilities/errorLogger');
const passport = require('passport');
const winston = require('winston');
const expressWinston = require('express-winston');
const requestLogger = require('./utilities/requsetLogger');


app.use(cors());
app.use(bodyParser.json());
var options = {
    file: {
      level: 'info',
      filename: './Logs/requestLogger.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    }
  };
  var errorOptions = {
    file: {
      level: 'info',
      filename: './Logs/errorLogger.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    }
  };
expressWinston.requestWhitelist.push('body')
expressWinston.responseWhitelist.push('body')
app.use(expressWinston.logger({
    transports: [
      new winston.transports.File(options.file)
    ],
    format: winston.format.combine(
      
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.json()
    )
  }));
app.use('/user',userRouter);
app.use('/product', productRouter)
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.File(errorOptions.file)
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}));
app.use(errorLogger);
app.listen(3000);
console.log("Server running on 3000");