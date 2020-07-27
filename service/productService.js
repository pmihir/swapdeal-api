const productDb = require("../model/product");
const productDetails = require("../model/productStore");
const productSearch = require("../model/productSearch");

productService = {};

productService.getNewProductData = () => {
  return productDb.getNewProduct().then((data) => {
    return data;
  });
};

productService.getProductById = (queryString) => {
  return productDetails.getProductById(queryString).then((data) => {
    return data;
  });
};

productService.getProductBySearch = (queryString) => {
  console.log(queryString.data);
  return productSearch.searchByQuery(queryString.data).then((data => {
    return data;
  }))
  // return productDetails.getProductBySearch(queryString).then((products) => {
  //   for (let product of products) {
  //     for (let colors of product.color) {
  //       if (searchStringArray.includes(colors.color.toLowerCase())) {
  //         product.image = colors.image;
  //       }
  //     }
  //   }
  //   return products;
  // });
};

module.exports = productService;
