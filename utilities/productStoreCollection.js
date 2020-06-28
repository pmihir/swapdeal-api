const {Schema} = require("mongoose");
const Mongoose = require("mongoose");
const uri = "mongodb+srv://Mihir:Mihir%401234@cluster0-kvs47.mongodb.net/SwapDeal?retryWrites=true&w=majority";
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex',true);
const prodctStoreCollection = {};

const newElectronicsProductSchema = Schema({
    category:String,
    name:String,
    discountPrice:String,
    price:String,
    image:String,
    brand:String
},{collection : "Electronics", timestamp:true})

const newAppliancesProductSchema = Schema({
    category:String,
    name:String,
    discountPrice:String,
    price:String,
    image:String,
    brand:String
},{collection : "Appliances", timestamp:true});

prodctStoreCollection.getElectronicsCollection = () => {
    return Mongoose.connect(uri, {useNewUrlParser:true,useUnifiedTopology: true}).then((database)=>{
        return database.model('Electronics', newElectronicsProductSchema)
    }).catch((error)=>{
        console.log(error);
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

prodctStoreCollection.getAppliancesCollection = () => {
    return Mongoose.connect(uri, {useNewUrlParser:true,useUnifiedTopology: true}).then((database)=>{
        return database.model('Appliances', newAppliancesProductSchema)
    }).catch((error)=>{
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

module.exports = prodctStoreCollection;