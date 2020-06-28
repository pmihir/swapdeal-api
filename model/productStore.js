const prodctStoreCollection = require('../utilities/productStoreCollection');
const productStoreDb = {};

productStoreDb.getElectronicsCollection = () => {
    return prodctStoreCollection.getElectronicsCollection().then(model=>{
        return model.find({},{_id:0}).then(data=>{
            return data;
        })
    })
}

productStoreDb.getAppliancesCollection = () => {
    console.log("in model appliances collection");
    return prodctStoreCollection.getAppliancesCollection().then(model=>{
        return model.find({},{_id:0}).then(data=>{
            return data;
        })
    })
}

module.exports = productStoreDb;
