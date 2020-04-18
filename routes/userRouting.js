const express = require('express');
const userRouter = express.Router();
const userService = require("../service/userService");
const passport = require('passport');
require('../utilities/passport')(passport)

userRouter.post('/register',(req,res,next)=>{
    return userService.register(req.body).then(data=>{
        res.json(data);
    }).catch(err=>next(err));
});

userRouter.post('/login', passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    return userService.login(req.body).then(data=>{
        res.json(data);
    }).catch(err=>next(err));
})

module.exports = userRouter;