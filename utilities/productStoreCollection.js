const { Schema } = require("mongoose");
const Mongoose = require("mongoose");
const DbConnection = require("../config/DbConnection")
var Mongoosastic = require("mongoosastic");
const uri =
  "mongodb+srv://Mihir:Mihir%401234@cluster0-kvs47.mongodb.net/SwapDeal?retryWrites=true&w=majority";
Mongoose.Promise = global.Promise;
Mongoose.set("useCreateIndex", true);

const prodctStoreCollection = {};

const newProductSchema = Schema(
  {
    category: String,
    subcategory: String,
    name: String,
    discountPrice: Number,
    price: Number,
    image: String,
    brand: String,
    productId: String,
    color: {
      color: String,
      image: String,
      price: Number
    }
  },
  { collection: "Products", timestamp: true }
);

const productDetailSchema = Schema(
  {
    ProductName: { title: String, configuration: String },
    rating: Array,
    price: Number,
    discountPrice: Number,
    desciption: {
      Processor: String,
      OperatingSystem: String,
      Display: String,
      MeomoryAndStroage: String,
      DesignAndBattery: String,
      Warranty: String,
      PreinstalledSoftware: String,
      OtherFeatures: String
    },
    image: String,
    brand: String,
    productId: String,
    color: Array,
    quantity: Number,
    category: String,
    salesRank: Number,
    productId: String,
    size: String
  },
  { collection: "TestProduct", timestamp: true }
);

prodctStoreCollection.getProductCollection = () => {
  return Mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((database) => {
      return database.model("Products", newProductSchema);
    })
    .catch((error) => {
      console.log(error);
      let err = new Error("Could not connect to Database");
      err.status = 500;
      throw err;
    });
};

prodctStoreCollection.getproductDetailsCollection = () => {
  return Mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((database) => {
      return database.model("TestProduct", productDetailSchema);
    })
    .catch((error) => {
      console.log(error);
      let err = new Error("Could not connect to Database");
      err.status = 500;
      throw err;
    });
};

module.exports = prodctStoreCollection;
