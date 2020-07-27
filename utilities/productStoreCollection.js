const { Schema } = require("mongoose");
const Mongoose = require("mongoose");
var Mongoosastic = require("mongoosastic");
const uri =
  "mongodb+srv://Mihir:Mihir%401234@cluster0-kvs47.mongodb.net/SwapDeal?retryWrites=true&w=majority";
Mongoose.Promise = global.Promise;
Mongoose.set("useCreateIndex", true);
const prodctStoreCollection = {};

const newElectronicsProductSchema = Schema(
  {
    category: String,
    name: String,
    discountPrice: String,
    price: String,
    image: String,
    brand: String,
  },
  { collection: "TestProduct", timestamp: true }
);

const newAppliancesProductSchema = Schema(
  {
    category: String,
    name: String,
    discountPrice: String,
    price: String,
    image: String,
    brand: String,
  },
  { collection: "Appliances", timestamp: true }
);

const dummyProductSchema = Schema(
  {
    productId: String,
    name: String,
    price: String,
    discountedPrice: String,
    color: Array,
    size: String,
    category: String,
    tags: Array,
    image: String,
  },
  { collection: "Dummy", timestamp: true }
).index({ tags: "text" });

dummyProductSchema.plugin(Mongoosastic, {
  "host": "localhost",
  "port": 9200
});



prodctStoreCollection.getElectronicsCollection = () => {
  return Mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((database) => {
      return database.model("TestProduct", newElectronicsProductSchema);
    })
    .catch((error) => {
      console.log(error);
      let err = new Error("Could not connect to Database");
      err.status = 500;
      throw err;
    });
};

prodctStoreCollection.getAppliancesCollection = () => {
  return Mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((database) => {
      return database.model("Appliances", newAppliancesProductSchema);
    })
    .catch((error) => {
      let err = new Error("Could not connect to Database");
      err.status = 500;
      throw err;
    });
};


prodctStoreCollection.getDummyCollection = () => {
  return Mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((database) => {
      return database.model("Dummy", dummyProductSchema);
    })
    .catch((error) => {
      let err = new Error("Could not connect to Database");
      err.status = 500;
      throw err;
    });
};

module.exports = prodctStoreCollection;
