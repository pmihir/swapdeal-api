const {Schema} = require("mongoose");
const Mongoose = require("mongoose");
const uri = "mongodb+srv://Mihir:Mihir%401234@cluster0-kvs47.mongodb.net/SwapDeal?retryWrites=true&w=majority";
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex',true);
const prodctStoreCollection = {};

const newProductSchema = Schema({
    category:String,
    name:String,
    discountPrice:String,
    price:String,
    image:String,
    brand:String
},{collection : "Electronics", timestamp:true})

prodctStoreCollection.getElectronicsCollection = () =>{
    return Mongoose.connect(uri, {useNewUrlParser:true}).then((database)=>{
        return database.model('Electronics', newProductSchema)
    }).catch((error)=>{
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

module.exports = prodctStoreCollection;