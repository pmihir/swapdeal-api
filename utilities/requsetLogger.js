var winston = require('winston');

const now = new Date();

var logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: '../Logs/requestLogger.log',
      level: 'info',
      json: false,
    }),
    new winston.transports.Console()
  ]
});

module.exports = logger;
module.exports.stream = {
  write: function(message, encoding) {
    logger.info(message);
    console.log('message=', message);
  }
};