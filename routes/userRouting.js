const express = require('express');
const userRouter = express.Router();
const userService = require("../service/userService");
const passport = require('passport');
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, 'Yoursecret', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


userRouter.post('/register',(req,res,next)=>{
    return userService.register(req.body).then(data=>{
        res.json(data);
    }).catch(err=>next(err));
});

userRouter.post('/login', (req,res,next)=>{
    return userService.login(req.body).then(data=>{
        res.json(data);
    }).catch(err=>next(err));
});

userRouter.post('/socialLogin',(req,res,next)=>{
    return userService.socialLogin(req.body).then(data=>{
        res.json(data);
    }).catch(err=>next(err));
});

userRouter.post('/req-reset-password',(req,res,next)=>{
    return userService.resetPassword(req.body).then(data=>{
        res.json(data);
    }).catch(err=>next(err));
})

userRouter.post('/valid-password-token',(req,res,next)=>{
    return userService.validateToken(req.body).then(data=>{
        res.json(data);
    }).catch(err=>next(err));
});

userRouter.post('/new-password',(req,res,next)=>{
    return userService.newPassword(req.body).then(data=>{
        res.json(data);
    }).catch(err=>next(err));
});

userRouter.get('/profile', authenticateJWT, (req, res, next) => {
    res.json({ user: req.user });
});

module.exports = userRouter;