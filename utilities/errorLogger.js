var fs = require('fs');

var errorLogger = function(err, req, res, next){
    if(err){
        fs.appendFile('./Logs/ErrorLogger.txt', new Date() + "-" + err.stack + "\n",(error)=>{
            console.log("Failed in logging Error");
        })
        if(err.status){
            res.status(err.status)
        }
        res.json({"message":err.message});
    }
    next();
}

module.exports = errorLogger;