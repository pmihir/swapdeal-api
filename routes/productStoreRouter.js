const express = require('express');
const productStoreRouter = express.Router();
const productStoreService = require('../service/productStoreService')



productStoreRouter.get('/Electronics',(req,res,next)=>{
    return productStoreService.getElectronicsData().then(data=>{
        res.json(data);
    }).catch(err=>next(err));
});

productStoreRouter.get('/Appliances',(req,res,next)=>{
    return productStoreService.getAppliancesData().then(data=>{
        res.json(data);
    }).catch(err=>next(err));
});

module.exports = productStoreRouter;