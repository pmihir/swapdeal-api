const userCollection = require("../utilities/userConnection");
const cartDb = {};

cartDb.addToCart = (cartData) => {
  let productData = cartData.productData;
  let userId = cartData.userId;
  return userCollection
    .getUserCollection()
    .find({ _id: userId })
    .then((userData) => {
      let userCart = userData[0].cart;
      let productFlag = false;
      userCart.forEach((element) => {
        if (element.pId == productData.pId) {
          productFlag = true;
        }
      })
      if (productFlag == true) {
        return userCollection
          .getUserCollection()
          .updateOne(
            { _id: userId, cart: { $elemMatch: { pId: productData.pId } } },
            { $inc: { "cart.$.qty": 1 } }
          )
          .then((updatedCart) => {
            if (updatedCart.nModified == 1) {
              console.log(userData);
              return 12;
            } else {
              return 13;
            }
          });
      } else {
        productData.qty = 1;
        console.log(productData);
        return userCollection
          .getUserCollection()
          .updateOne({ _id: userId }, { $push: { cart: productData } })
          .then((results) => {
            console.log(userData);
            if (results.nModified == 1) {
              return 12;
            } else {
              return 13;
            }
          });
      }
    });
};

cartDb.getCartData = (userId) => {
  return userCollection.getUserCollection().find({ _id: userId }).then((cartArray) => {
    return cartArray.cart;
  })
}

module.exports = cartDb;
