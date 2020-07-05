const express = require('express');
const productRouter = express.Router();
const productService = require('../service/productService')



productRouter.get('/get-new-product',(req,res,next)=>{
    return productService.getNewProductData().then(data=>{
        res.json(data);
    }).catch(err=>next(err));
});
productRouter.get('/productDetails',(req, res, next) => {
    return productService.getProductById(req.query).then(data => {
        res.json(data);
    }).catch(err => next(err))
})


module.exports = productRouter;