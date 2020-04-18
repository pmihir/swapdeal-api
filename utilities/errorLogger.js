var errorLogger = function(err, req, res, next){
    if(err){
        if(err.status){
            res.status(err.status)
        }
        res.json({"message":err.message});
    }
    next();
}

module.exports = errorLogger;