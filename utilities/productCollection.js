const { Schema } = require("mongoose");
const Mongoose = require("mongoose");
const uri = "mongodb+srv://Mihir:Mihir%401234@cluster0-kvs47.mongodb.net/SwapDeal?retryWrites=true&w=majority";
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex', true);
const productCollection = {};
// var newConnection = require("../config/DbConnection");
// var db = newConnection.getDb();

const newProductSchema = Schema({
    category: String,
    name: String,
    discountPrice: String,
    price: String,
    image: String,
}, { collection: "NewSells", timestamp: true })

productCollection.getNewProductColletion = () => {

    return Mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then((database) => {
            return database.model("NewSelles", newProductSchema);
        })
        .catch((error) => {
            console.log(error);
            let err = new Error("Could not connect to Database");
            err.status = 500;
            throw err;
        });
}

module.exports = productCollection;