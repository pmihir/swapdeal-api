const productStoreCollection = require("../utilities/productStoreCollection");
const prodctStoreCollection = require("../utilities/productStoreCollection");
const productStoreDb = {};

productStoreDb.getProductCategoryData = (category) => {
  return prodctStoreCollection.getProductCollection().find({ category: category.category }, { _id: 0 }).then(data => {
    return data;
  });
};

productStoreDb.getProductById = (queryParams) => {
  console.log("query Params", queryParams);
  return prodctStoreCollection.getproductDetailsCollection().find({ productId: queryParams.productId }, { _id: 0 }).then(data => {
    return data;
  });
};

// productStoreDb.getAppliancesCollection = () => {
//   return productStoreCollection.getAppliancesCollection().then((model) => {
//     return model.find({}, { _id: 0 }).then((data) => {
//       return data;
//     });
//   });
// };

// productStoreDb.getProductBySearch = (queryParams) => {
//   console.log("query Params", queryParams.data);
//   var newData = { "name": "Elecotrnice", "price": "20000" }
//   return productStoreCollection.getDummyCollection().then((model) => {
//     return model.createMapping((err, Mapping) => {
//       console.log("mapping created");
//       return model.insertMany(newData).then((exe) => {
//         console.log(exe);
//         return model.on('es-indexed', (err, result) => {
//           console.log("indexed added to elasticsearch");
//         })
//       })
//     })
//     // model.search({ query_string: { query: "LAPTOP" } }).then(console.log(data));
//     // let query = `'\"${queryParams.data}\"'`;
//     // return model.find({ $text: { $search: query, $caseSensitive: false } }).then((data) => {
//     //   return data;
//     // });
//   });
// };

module.exports = productStoreDb;
