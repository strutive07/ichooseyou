'use strict';

const user = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
// const config = require('../config/config');

exports.ChangePassword = (id, password, new_password, phone_number) =>
    new Promise((resolve, reject) => {
        user.find({auth_id : id})
            .then(results =>{
            var user = results[0];

            if(bcrypt.compareSync(password, user.hashed_password)){
                const salt = bcrypt.genSaltSync(10);
                console.log('salt -> ' + salt);
                console.log('new_password -> ' + new_password);
                const hash = bcrypt.hashSync(new_password, salt);
                user.first_login = true;
                user.hashed_password = hash;
                user.phone_number = phone_number;
                return user.save();
            }else{
                reject({ status: 401, message: 'Invalid Old Password !' });
            }
        }).then(user => resolve({ status: 200, message: 'Password Updated Sucessfully !'
        }).catch(err => reject({
            status: 500, message: 'Internal Server Error !'
        })));
    });

exports.ResetPasswordInit = (email, id) =>
    new Promise((resolve, reject) => {
        const random = randomstring.generate(8);
        user.find({auth_id : id}).then(results => {
                if(results.length == 0){
                    reject({ status: 404, message: 'User Not Found !' });
                }else{
                    let user = results[0];
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(random, salt);
                    user.temp_password = hash;
                    user.temp_password_time = new Date();

                    return user.save();
                }
            }).then(user => {
                const transporter = nodemailer.createTransport(`smtps://${config.email}:${config.password}@smtp.gmail.com`);
                const mailOptions = {
                    from: `"${config.name}" <${config.email}>`,
                    to: email,
                    subject: 'Reset Password Request ',
                    html: `Hello ${user.name},<br><br>
    			Your reset password token is <b>${random}</b>. 
    			If you are viewing this mail from a Android Device click this <a href = "http://localhost:3000/${random}">link</a>. 
    			The token is valid for only 2 minutes.<br><br>
    			Thanks,<br>
    			Learn2Crack.`
                };
                return transporter.sendMail(mailOptions);
            }).then(info => {
                console.log('info : ',info);
                resolve({ status: 200, message: 'Check mail for instructions' });
            }).catch(err => {
                console.log('err : ', err);
                reject({ status: 500, message: 'Internal Server Error !' });
        });

    });

exports.ResetPasswordFinish = (id, token, password) =>
    new Promise((resolve, reject) => {
        user.find({auth_id : id}).then(results => {
            let user = results[0];
            const time_gap = new Date() - new Date(user.temp_password_time);
            const seconds = Math.floor(time_gap/1000);
            if(seconds <= 120){
                return user;
            }else{
                reject({ status: 401, message: 'Time Out ! Try again' });
            }
        }).then(user => {
            if(bcrypt.compareSync(token, user.temp_password)){
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                user.hashed_password = hash;
                user.temp_password = undefined;
                user.temp_password_time = undefined;
                return user.save();
            }else{
                reject({ status: 401, message: 'Invalid Token !' });
            }
        }).then(user =>
            resolve({ status: 200, message: 'Password Changed Sucessfully !' })
        ).catch(err =>
            reject({ status: 500, message: 'Internal Server Error !' })
        );
    });