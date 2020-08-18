const productService = require("./productService");

const cartDb = require("../model/cart");
const configureUserErrorMessageList = require("../utilities/errorMessages");
cartService = {};

cartService.addToCart = (cartData) => {
  return cartDb.addToCart(cartData).then((data) => {
    console.log(data);
    if (data == 12) {
      return { message: configureUserErrorMessageList[data] };
    } else {
      let err = new Error(configureUserErrorMessageList[data]);
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

module.exports = cartService;
