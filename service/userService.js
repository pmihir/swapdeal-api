const userDb = require('../model/users');
const configureUserErrorMessageList = require("../utilities/errorMessages");
const jwt = require('jsonwebtoken');
const userService = {};

userService.register = (userData)=>{
    console.log("in service",userData);
    return userDb.register(userData).then(Data=>{
        if(Data){
            return {"message" : configureUserErrorMessageList[Data]};
        } 
        else{
            let err = new Error("Email already Existed!!!");
            err.status = 500;
            throw err;
        }
    })
}


// final enhancement of code yet to be done
userService.login = (userData) =>{
    return userDb.login(userData).then(data=>{
        if(data){
            let err = new Error(configureUserErrorMessageList[data]);
            err.status = 500;
            throw err;
        }
        else{
            var token = jwt.sign({
                data : data.username
            },"Yoursecret");
            var user = {
                success:true,
                token : 'jwt ' + token,
                user : data
            }
            return user;
        }
    })
}

userService.socialLogin = (userData) => {
    return userDb.socialLogin(userData).then(data=>{
        var token = jwt.sign({
            data : data.username
        },"Yoursecret");
        var user = {
            success:true,
            token : 'jwt' + token,
            user : data
        }
        return user;
    })
}

userService.resetPassword = (userData) => {
    return userDb.resetPassword(userData).then(data=>{
        if(data){
            var successData = {
                message : configureUserErrorMessageList[data]
            }
            return successData;
        }
        else{
            let err = new Error("Email Authentication Failed!!!");
            err.status = 500;
            throw err;
        }
    })
}

userService.validateToken = (userData) => {
    return userDb.ValidPasswordToken(userData).then(data=>{
        if(data){
            var returnData = {
                message : "Token Verified"
            }  
            return returnData;
        }
        else{
            let err = new Error(configureUserErrorMessageList[8]);
            err.status = 500;
            throw err;
        }
    })
}

userService.newPassword = (password) => {
    return userDb.newPassword(password).then(data=>{
        if(!data){
            var returnData = {
                message : "Password Reset Successfully"
            }  
            return returnData;
        }
        else{
            let err = new Error(configureUserErrorMessageList[data]);
            err.status = 500;
            throw err;
        }
    })
}

module.exports = userService;