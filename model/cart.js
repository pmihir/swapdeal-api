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
              return userCollection.getUserCollection().find({ _id: userId }).then((data) => {
                return data[0];
              })
            } else {
              return null;
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
              return userCollection.getUserCollection().find({ _id: userId }).then((data) => {
                return data[0];
              })
            } else {
              return null;
            }
          });
      }
    });
};

cartDb.getCartData = (data) => {
  console.log(data.userId);
  return userCollection.getUserCollection().find({ _id: data.userId }).then((cartArray) => {
    console.log(cartArray);
    return cartArray[0].cart;
  })
}

cartDb.removeProduct = (data) => {
  console.log(data.userId);
  return userCollection.getUserCollection().updateOne({ _id: data.userId }, { $pull: { 'cart': { 'pId': data.productId } } }).then((updatedCart) => {
    if (updatedCart.nModified == 1) {
      return userCollection.getUserCollection().find({ _id: data.userId }).then((data) => {
        return data[0];
      })
    }
    return null;
  })
}

cartDb.changeQty = (data) => {
  console.log(data.userId);
  return userCollection.getUserCollection().updateOne({ _id: data.userId, cart: { $elemMatch: { pId: data.productId } } },
    { $set: { 'cart.$.qty': data.quantity } }).then((updatedCart) => {
      if (updatedCart.nModified == 1) {
        return userCollection.getUserCollection().find({ _id: data.userId }).then((data) => {
          return data[0];
        })
      }
      return null;
    })
}

module.exports = cartDb;
