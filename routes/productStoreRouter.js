const express = require('express');
const productStoreRouter = express.Router();
const productStoreService = require('../service/productStoreService')



productStoreRouter.get('/searchCategory', (req, res, next) => {
    return productStoreService.getProductCategoryData(req.query).then(data => {
        res.json(data);
    }).catch(err => next(err));
});

// productStoreRouter.get('/Appliances',(req,res,next)=>{
//     return productStoreService.getAppliancesData().then(data=>{
//         res.json(data);
//     }).catch(err=>next(err));
// });

module.exports = productStoreRouter;