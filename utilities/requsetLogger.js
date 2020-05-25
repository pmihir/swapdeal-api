var fs = require('fs');

var requestLogger = function(req,res,next){
  var message = {};
  message.Date = new Date();
  message.Method = req.method;
  message.url = req.url;
  var logMessage = "" + new Date() + " " + req.method + " " + req.url + " " + "\n";
  fs.appendFile('./Logs/RequestLogger.txt', JSON.stringify(message)+"\n", function(err){
    if (err) return next(err);
  });
  next();
}

module.exports = requestLogger;