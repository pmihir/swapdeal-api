const userDb = require('../model/users');
const jwt = require('jsonwebtoken');

const userService = {};

userService.register = (userData)=>{
    console.log("in service",userData);
    return userDb.register(userData).then(Data=>{
        if(Data) return {"message" : "User is successfully Registered!!!"};
        else{
            let err = new Error("Email already Existed!!!");
            err.status = 500;
            throw err;
        }
    })
}


userService.login = (userData) =>{
    return userDb.login(userData).then(data=>{
        if(data == null){
            let err = new Error("Email is not Existed...Please Register First!!!");
            err.status = 500;
            throw err;
        }
        if(data == false){
            let err = new Error("Incorrect Password");
            err.status = 500;
            throw err;
        }
        else{
            var token = jwt.sign({
                data : data.username
            },"Yoursecret");
            var user = {
                success:true,
                token : 'JWT' + token,
                user : data
            }
            return user;
        }
    })
}

module.exports = userService;