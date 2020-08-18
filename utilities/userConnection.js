const { Schema } = require("mongoose");
const Mongoose = require("mongoose");
const crypto = require("crypto");
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://Mihir:Mihir%401234@cluster0-kvs47.mongodb.net/SwapDeal?retryWrites=true&w=majority";
const jwt = require("jsonwebtoken");
Mongoose.Promise = global.Promise;
Mongoose.set("useCreateIndex", true);
// Mongoose.set('userCreateIndex', true);
// const url = "mongodb://localhost:27017/SwapDeal";
// mongodb+srv://Mihir:<password>@cluster0-kvs47.mongodb.net/test?retryWrites=true&w=majority
var newConnection = require("../config/DbConnection");

const userSchema = Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phonenumber: { type: String, required: true },
    password: { type: String, required: true },
    cart: [],
  },
  { collection: "Users", timestamp: true }
);

const resettokenSchema = Schema(
  {
    _userId: { type: Mongoose.Schema.Types.ObjectId, ref: "User" },
    resettoken: String,
    createdAt: { type: Date, default: Date.now, expires: 43200 },
  },
  { collection: "ResetPassword", timestamp: true }
);

let userCollection = {};

userCollection.getUserCollection = () => {
  return newConnection.get().model("Users", userSchema);
  // return Mongoose.connect(uri, {useNewUrlParser:true,useUnifiedTopology: true}).then((database)=>{
  //     console.log("connected");
  //     return database.model('Users', userSchema)
  // }).catch((error)=>{
  //     console.log(error);
  //     let err = new Error("Could not connect to Database");
  //     err.status = 500;
  //     throw err;
  // })
};

userCollection.getResetTokenCollection = () => {
  return Mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((database) => {
      return database.model("ResetPassword", resettokenSchema);
    })
    .catch((error) => {
      let err = new Error("Could not connect to Database");
      err.status = 500;
      throw err;
    });
};

module.exports = userCollection;
