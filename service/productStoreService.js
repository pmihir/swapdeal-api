const productStoreDb = require('../model/productStore');

productStoreService = {};

productStoreService.getElectronicsData = () => {
    return productStoreDb.getElectronicsCollection().then(data=>{
        return data;
    })
}

module.exports = productStoreService;