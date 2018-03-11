'use strict';

const user = require('../models/user');

exports.GetProfile = id =>
    new Promise((resolve, reject) => {
       user.find({auth_id : id}).then(results =>
           resolve(results[0])
       ).catch(err => {
              console.log("err : " + err);
              reject({ status: 500, message: 'Internal Server Error !' })
       })});

exports.get_ranking = id =>
    new Promise((resolve, reject) => {
        user.find().sort({score : -1}).then(results => {
            var i=0;
               for(i = 0; i<results.length; i++){
                      if(results[i].auth_id == id){
                             break;
                      }
               }
               var top_ranking = [results[0], results[1], results[2]];
               resolve({top_ranking : top_ranking, my_ranking : i+1, my_ranking_info : results[i]});
        }).catch(err => {
            console.log("err : " + err);
            reject({ status: 500, message: 'Internal Server Error !' })
        })});

exports.get_older_ranking = id =>
    new Promise((resolve, reject) => {
        user.find().sort({score : 1}).then(results => {
            var i=0;
            for(i = 0; i<results.length; i++){
                if(results[i].auth_id == id){
                    break;
                }
            }
            var top_ranking = [results[0], results[1], results[2]];
            resolve({top_ranking : top_ranking, my_ranking : i+1, my_ranking_info : results[i]});
        }).catch(err => {
            console.log("err : " + err);
            reject({ status: 500, message: 'Internal Server Error !' })
        })});


exports.add_score = (id, add_score) =>
    new Promise((resolve, reject) => {
        user.find({auth_id : id}).then(results => {
            var user = results[0];
            user.score = user.score + add_score;
            return user.save();
        }).then(user => {
               resolve({user : user})
        }).catch(err => {
            console.log("err : " + err);
            reject({ status: 500, message: 'Internal Server Error !' })
        })});