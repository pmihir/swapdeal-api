const express = require("express");
var cartRouter = express.Router();
const cartService = require("../service/addToCartService");

cartRouter.post("/addToCart", (req, res, next) => {
  return cartService
    .addToCart(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => next(err));
});

cartRouter.post("/changeQty", (req, res, next) => {
  console.log(req);
  return cartService
    .changeQty(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => next(err));
});

cartRouter.post("/removeProduct", (req, res, next) => {
  console.log(req);
  return cartService
    .removeProduct(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => next(err));
});

cartRouter.get("/getCartData", (req, res, next) => {
  return cartService
    .getCartData(req.query)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => next(err));
});

module.exports = cartRouter;
