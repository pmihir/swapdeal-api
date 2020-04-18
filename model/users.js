const userDb = {};
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userCollection = require('../utilities/userConnection');


userDb.generatePassword = (password) => {
    return bcrypt.hash(password, saltRounds).then(data => {
        console.log(data);
        return data;
    });
}

userDb.register = (userData) => {
    return userCollection.getUserCollection().then(model => {
        return model.findOne({ "email": userData.email }).then(data => {
            if (data != null) {
                return null;
            }
            else {
                return userDb.generatePassword(userData.password).then(password => {
                    userData.password = password;
                    return model.insertMany(userData).then(data => {
                        console.log("insert", data);
                        if (data) {
                            return data;
                        }
                        else {
                            return null;
                        }
                    })
                });
            }
        })
    })
}

userDb.login = (userData) => {
    return userCollection.getUserCollection().then(model => {
        return model.findOne({"email":userData.email}).then(user=>{
            if(!user){
                return null;
            }
            else{
                return bcrypt.compare(userData.password, user.password).then(dataAuthentication=>{
                    if(dataAuthentication==true){
                        return user;
                    }
                    else{
                        return false;
                    }
                })
            }
        })
    })
}


module.exports = userDb;