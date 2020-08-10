const { Schema } = require("mongoose");
const Mongoose = require("mongoose");
const uri = "mongodb+srv://Mihir:Mihir%401234@cluster0-kvs47.mongodb.net/SwapDeal?retryWrites=true&w=majority";
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex', true);
const productCollection = {};
var newConnection = require("../config/DbConnection");
// var db = newConnection.getDb();

const newProductSchema = Schema({
    category: String,
    name: String,
    discountPrice: String,
    price: String,
    image: String,
}, { collection: "NewSells", timestamp: true })

productCollection.getNewProductCollection = () => {
    return newConnection.get().model("NewSelles", newProductSchema);
}

module.exports = productCollection;