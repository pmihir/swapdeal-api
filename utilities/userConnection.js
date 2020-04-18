const {Schema} = require("mongoose");
const Mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
Mongoose.Promise = global.Promise;
Mongoose.set('useCreateIndex',true);
// Mongoose.set('userCreateIndex', true);
const url = "mongodb://localhost:27017/SwapDeal";

const userSchema = Schema({
    firstname:String,
    lastname:String,
    username:String,
    email: {type:String , unique:true},
    phonenumber:Number,
    password:String,
}, {collection : "Users", timestamp:true})




let userCollection = {};

userCollection.getUserCollection = () =>{
    return Mongoose.connect(url, {useNewUrlParser:true}).then((database)=>{
        return database.model('Users', userSchema)
    }).catch((error)=>{
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}




module.exports = userCollection;