'use strict';

const product = require('../models/elder_user_quest_accept_list');
const db = require('mongodb');
exports.GetOneProduct = _id =>
    new Promise((resolve, reject) => {
        var ObjectId = db.ObjectId(_id);
       product.find({_id : ObjectId}).then(results =>
           resolve(results[0])
       ).catch(err => {
              console.log("err : " + err);
              reject({ status: 500, message: 'Internaasdfasdfasdfasfasfsadfasfdl Server Error !' })
       })});


exports.GetAllProduct = _id =>
    new Promise((resolve, reject) => {
        product.find().then(results =>
            resolve(results)
        ).catch(err => {
            console.log("err : " + err);
            reject({ status: 500, message: 'Internalasdf Server Error !' })
        })});