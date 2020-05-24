const userDb = {};
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const saltRounds = 10;
const userCollection = require('../utilities/userConnection');
const Mongoose = require("mongoose");


userDb.generatePassword = (password) => {
    return bcrypt.hash(password, saltRounds).then(data => {
        return data;
    });
}

userDb.register = (userData) => {
    return userCollection.getUserCollection().then(model => {
        return model.findOne({ "email": userData.email }).then(data => {
            if (data != null) return null;
            return userDb.generatePassword(userData.password).then(password => {
                userData.password = password;
                return model.insertMany(userData).then(data => {
                    return data ? 2 : 3; // 2 and 3 are Error Codes
                })
            });
        })
    })
}

userDb.login = (userData) => {
    return userCollection.getUserCollection().then(model => {
        return model.findOne({ "email": userData.email }).then(user => {
            if (!user) return 4;
            return bcrypt.compare(userData.password, user.password).then(dataAuthentication => {
                return (dataAuthentication == true) ? user : 5;
            })
        })
    })
}

userDb.socialLogin = (userData) => {
    return userCollection.getUserCollection().then(model => {
        return model.findOne({ "email": userData.email }).then(user => {
            if (!user) {
                model.insertMany(userData).then(data => {
                    return data;
                })
            }
            return user;
        })
    })
}

// Rest Password error part is not finished yet
userDb.resetPassword = (userData) => {
    console.log(userData);
    return userCollection.getUserCollection().then(model => {
        return model.findOne({ "email": userData.email }).then(data => {
            if (!data) return 4;
            var resetToken = { _userId: data._id, resettoken: crypto.randomBytes(16).toString('hex') };
            return userCollection.getResetTokenCollection().then(model1 => {
                return model1.insertMany(resetToken).then(tokenData => {
                    if (!tokenData) return 8;
                    else {
                        return model1.findOne({ _userId: data._id, resettoken: { $ne: resetToken.resettoken }}).remove().then(data => {
                            var transporter = nodemailer.createTransport({
                                service: 'Gmail',
                                port: 465,
                                auth: {
                                    user: 'pmihir0612@gmail.com',
                                    pass: 'Mihir@681997'
                                }
                            });
                            var mailOptions = {
                                to: 'pmihir0612@gmail.com',
                                from: data.email,
                                subject: 'SWAPDEAL Password Reset',
                                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                                    'http://localhost:4200/response-reset-password/' + resetToken.resettoken + '\n\n' +
                                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                            }
                            return transporter.sendMail(mailOptions).then((err,info) => {
                                return 10;
                            }).catch(err=>{
                                return null;
                            })
                        })
                    }
                })
            })

        })
    })
}

userDb.ValidPasswordToken = (userData) => {
    if (!userData.resetToken) return 7;
    return userCollection.getResetTokenCollection().then(model => {
        return model.findOne({ resettoken: userData.resetToken }).then(data => {
            return data ? 11 : null;
        })
    })
}

userDb.newPassword = (password) => {
    return userCollection.getResetTokenCollection().then(model => {
        return model.findOne({ resettoken: password.resetToken }).then(userToken => {
            if (!userToken) return 8;
            return userCollection.getUserCollection().then(model1 => {
                return model1.findOne({ _id: userToken._userId }).then(userData => {
                    if (!userData) return 4;
                    return userDb.generatePassword(password.newPassword).then(generatedPassword => {
                        return model1.updateOne({ _id: userToken._userId }, { password: generatedPassword }).then(newData => {
                            return (newData.nModified == 0) ? 9 : null;
                        })
                    })
                })
            })
        })
    })
}


module.exports = userDb;