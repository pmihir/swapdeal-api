const productDb = require('../model/product');

productService = {};

productService.getNewProductData = () => {
    return productDb.getNewProduct().then(data=>{
        return data;
    })
}

module.exports = productService;