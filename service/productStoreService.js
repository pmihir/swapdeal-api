const productStoreDb = require("../model/productStore");

productStoreService = {};

productStoreService.getElectronicsData = () => {
  return productStoreDb.getElectronicsCollection().then((data) => {
    return data;
  });
};

productStoreService.getAppliancesData = () => {
  console.log("in service appliances");
  return productStoreDb.getAppliancesCollection().then((products) => {
    return products;
  });
};

module.exports = productStoreService;
