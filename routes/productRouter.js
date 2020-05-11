const express = require('express');
const prdouctRouter = express.Router();
const productService = require('../service/productService')



prdouctRouter.get('/get-new-product',(req,res,next)=>{
    return productService.getNewProductData().then(data=>{
        res.json(data);
    }).catch(err=>next(err));
});

module.exports = prdouctRouter;