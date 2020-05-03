var winston = require('winston');
var expressWinston = require('express-winston');

var options = {
    file: {
      level: 'info',
      filename: '../Logs/requestLogger.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    }
  };


  var requestLogger = function(req,res,next){
      new expressWinston.logger({
        transports: [
          new winston.transports.Console()
        ],
        format: winston.format.combine(
          winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
          }),
          winston.format.json()
        )
      })
      next();
  }

  module.exports = requestLogger;
  