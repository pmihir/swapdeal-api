const productDb = require('../model/product');
const productDetails = require('../model/productStore');

productService = {};

productService.getNewProductData = () => {
    return productDb.getNewProduct().then(data=>{
        return data;
    })
}

productService.getProductById = (queryString) => {
    return productDetails.getProductById(queryString).then(data=>{
        return data;
    })
}

module.exports = productService;