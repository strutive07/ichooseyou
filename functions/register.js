'use strict';

const user = require('../models/user');
const elder_user = require('../models/elder_user');

const bcrypt = require('bcryptjs');

exports.RegisterUser = (name, id, password, phone_number, first_connection) =>
    new Promise(((resolve, reject) => {
        const salt = bcrypt.genSaltSync(10);
        const hashed_password = bcrypt.hashSync(password, salt);

        user.find({auth_id : id}).then(result => {
            if(result.length == 0){
                return result;
            }else{
                reject({status: 404, message: '이미 존재하는 사용자 입니다.'});
            }
        }).then(result =>{
            const newUser = new user({
                name : name,
                auth_id : id,
                hashed_password: hashed_password,
                phone_number : phone_number,
                score : 0,
                is_elder : false,
                quest_id : -1,
                first_connection : first_connection,
                first_login : false,
                created_at : new Date(),
                temp_random_string : undefined,
                temp_temp_random_string_time : undefined,
                temp_password : undefined,
                temp_password_time : undefined
            });
            return newUser;
        }).then(newUser => {
            newUser.save();
        }).then(()=> resolve({
            status : 201,
            message : 'Sucessfully register user'
        })).catch(err =>{
            if(err.code == 11000){
                reject({ status: 409, message: 'User Already Registered !'});
            }else{
                reject({ status: 500, message: 'Internal Server Error !' });

            }
        });
    }));

exports.register_elder_user = (name, id, password, phone_number, quest_id) =>
    new Promise(((resolve, reject) => {
        const salt = bcrypt.genSaltSync(10);
        const hashed_password = bcrypt.hashSync(password, salt);

        user.find({auth_id : id}).then(result => {
            if(result.length == 0){
                return result;
            }else{
                reject({status: 404, message: '이미 존재하는 사용자 입니다.'});
            }
        }).then(result =>{
            const newUser = new user({
                name : name,
                auth_id : id,
                hashed_password : hashed_password,
                phone_number : phone_number,
                score : 0,
                is_elder : true,
                quest_id : quest_id,
                first_connection : -1,
                first_login : false,
                created_at : new Date(),
                temp_random_string : undefined,
                temp_temp_random_string_time : undefined,
                temp_password : undefined,
                temp_password_time : undefined
            });
            return newUser;
        }).then(newUser => {
            newUser.save();
        }).then(()=> resolve({
            status : 201,
            message : 'Sucessfully register user'
        })).catch(err =>{
            if(err.code == 11000){
                reject({ status: 409, message: 'User Already Registered !'});
            }else{
                reject({ status: 500, message: 'Internal Server Error !' });

            }
        });
    }));

exports.set_first_connection = (id, older_id) =>
    new Promise((resolve, reject) => {
        user.find({auth_id : id})
            .then(results =>{
                let user = results[0];

                user.first_connection = older_id;
                return user.save();
            })
            .then(user => resolve({ status: 200, message: 'Password Updated Sucessfully !', user : user })
                .catch(err => reject({ status: 500, message: 'Internal Server Error !' })));
    });