const productService = require("./productService");

const cartDb = require("../model/cart");
const configureUserErrorMessageList = require("../utilities/errorMessages");
cartService = {};

cartService.addToCart = (cartData) => {
  return cartDb.addToCart(cartData).then((data) => {
    console.log(data);
    if (data) {
      return data;
    } else {
      let err = new Error("Error while adding item to cart");
      err.status = 500;
      throw err;
    }
  });
}

cartService.getCartData = (userId) => {
  return cartDb.getCartData(userId).then((data) => {
    return data;
  });
}

cartService.changeQty = (updatedQuantity) => {
  return cartDb.changeQty(updatedQuantity).then((data) => {
    return data;
  });
}

cartService.removeProduct = (productData) => {
  return cartDb.removeProduct(productData).then((data) => {
    return data;
  });
}

module.exports = cartService;
