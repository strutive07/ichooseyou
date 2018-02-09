'use strict';


// auth_id : String,
//     quest_size : Number,
//     quest_bool : Array

const user = require('../models/user');
const user_quest_bool = require('../models/user_quest_bool');
const profile = require('../functions/profile');
const bcrypt = require('bcryptjs');

exports.register_user_quest_bool = (auth_id, quest_size) =>
    new Promise(((resolve, reject) => {
        user_quest_bool.find({auth_id : auth_id}).then(result => {
            if(result.length == 0){
                return result;
            }else{
                reject({status: 404, message: '이미 존재하는 사용자 퀘스트 테이블 입니다.'});
            }
        }).then(result =>{
            var quest_bool_array = [];
            for(var i=0; i<quest_size; i++){
                quest_bool_array.push(-1);
            }
            const new_user_quest_bool = new user_quest_bool({
                auth_id : auth_id,
                quest_size : quest_size,
                quest_bool : quest_bool_array
            });

            return new_user_quest_bool;
        }).then(new_user_quest_bool => {
            new_user_quest_bool.save();
        }).then(()=> resolve({
            status : 201,
            message : 'Sucessfully register user quest bool table'
        })).catch(err =>{
            if(err.code == 11000){
                reject({ status: 409, message: 'User quest bool table Already Registered !'});
            }else{
                reject({ status: 500, message: 'Internal Server Error !' });

            }
        });
    }));

exports.get_one_quest_bool = id =>
    new Promise((resolve, reject) => {
        user_quest_bool.find({auth_id : id}).then(results =>
            resolve(results[0])
        ).catch(err => {
            console.log("err : " + err);
            reject({ status: 500, message: 'Internal Server Error !' })
        })});

exports.set_one_quest_bool_in_progress = (id, quest_id) =>
    new Promise((resolve, reject) => {
        user_quest_bool.find({auth_id : id}).then(results => {
                var user_quest_table = results[0];
                var quest_num = Math.floor(quest_id/10) + quest_id % 10;
                user_quest_table.quest_bool[quest_num] = 0;
                return user_quest_table.save();
        }).then( user_quest_table =>
            resolve({ status: 200, message: '정상적으로 진행중으로 변경되었습니다.' , user_quest_table : user_quest_table})
        ).catch(err => {
            console.log("err : " + err);
            reject({ status: 500, message: 'Internal Server Error !' })
        })});

exports.set_one_quest_bool_finish = (id, quest_id) =>
    new Promise((resolve, reject) => {
        var g_user_quest_table;
        user_quest_bool.find({auth_id : id}).then(results => {
            var user_quest_table = results[0];
            var quest_num = Math.floor(quest_id/10) + quest_id % 10;
            user_quest_table.quest_bool[quest_num] = 1;
            return user_quest_table.save();
        }).then( user_quest_table => {
            var tmp_first_quest_id = Math.floor(quest_id/10) + 1;
            var tmp_second_quest_id = Math.floor(quest_id/10) + 2;
            g_user_quest_table = user_quest_table;
            if(user_quest_table.quest_bool[tmp_first_quest_id] === 1 && user_quest_table.quest_bool[tmp_second_quest_id] === 1){
                return profile.add_score(id, 200)
            }else{
                return profile.add_score(id, 0)
            }
        }).then(result =>
            resolve({ status: 200, message: '정상적으로 완료로 변경되었습니다.' , user_quest_table : g_user_quest_table })
        ).catch(err => {
            console.log("err : " + err);
            reject({ status: 500, message: 'Internal Server Error !' })
        })});
