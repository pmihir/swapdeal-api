const productColletion = require('../utilities/productStoreCollection');
const dbConnection = require("../config/DbConnection");
const productDb = {};

productDb.getNewProduct = () => {
    return productColletion.getNewProductCollection().find({}, { _id: 0 }).then(data => {
        return data;
    })
}

module.exports = productDb;
