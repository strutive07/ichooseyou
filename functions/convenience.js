'use strict';

const convenience = require('../models/elder_user');
const bcrypt = require('bcryptjs');

exports.RegisterConvenience = (name, lng, lat) =>
    new Promise(((resolve, reject) => {
        const newConvenience = new convenience({
            name : name,
            lat : lat,
            lng : lng
        });
        newConvenience.save().then(() => resolve({
            status : 201,
            message : 'Sucessfully register new Convenience area'
        })).catch(err =>{
            if(err.code == 11000){
                reject({ status: 409, message: 'Convenience area Already Registered !'});
            }else{
                reject({ status: 500, message: 'Internal Server Error !' });

            }
        });
    }));

exports.GetConvenience = (name, lat, lng) =>
    new Promise((resolve, reject) => {
        convenience.find({
            name : name,
            lat : lat,
            lng : lng
        }).then(results =>
            resolve(results[0])
        ).catch(err => {
            console.log("err : " + err);
            reject({ status: 500, message: 'Internal Server Error !' })
        })});
