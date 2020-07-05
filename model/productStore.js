const productStoreCollection = require('../utilities/productStoreCollection');
const productStoreDb = {};

productStoreDb.getElectronicsCollection = () => {
    return productStoreCollection.getElectronicsCollection().then(model=>{
        return model.find({},{_id:0}).then(data=>{
            return data;
        })
    })
}

productStoreDb.getProductById = (queryParams) => {
    console.log('query Params', queryParams );
    return productStoreCollection.getElectronicsCollection().then(model => {
        return model.find({productId: queryParams.productId}, {_id:0}).then(data => {
            return data;
        })
    })
}

productStoreDb.getAppliancesCollection = () => {
    console.log("in model appliances collection");
    return productStoreCollection.getAppliancesCollection().then(model=>{
        return model.find({},{_id:0}).then(data=>{
            return data;
        })
    })
}

module.exports = productStoreDb;
