const { Schema } = require("mongoose");
const Mongoose = require("mongoose");
var Mongoosastic = require("mongoosastic");
const productCollection = require("../utilities/productCollection");
const uri =
    "mongodb+srv://Mihir:Mihir%401234@cluster0-kvs47.mongodb.net/SwapDeal?retryWrites=true&w=majority";
Mongoose.Promise = global.Promise;
Mongoose.set("useCreateIndex", true);

let _db;

function connect(callback) {
    Mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err, db) => {
        _db = db;
        callback();
    })
}



function get() {
    console.log("in db");
    return _db;
}

function close() {
    _db.close();
}

module.exports = {
    connect,
    get,
    close
};




// newConnection.connectToServer = () => {
//     Mongoose.connect(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }, function (err, database) {
//         _db = database;
//         console.log("in first function", _db);
//         return callback(err);
//     })
// }

// newConnection.getDb = () => {
//     return _db;
// }

// module.exports = productCollection;