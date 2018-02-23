'use strict';


// auth_id : String,
//     quest_size : Number,
//     quest_bool : Array

const elder_user_quest_accept_list = require('../models/elder_user_quest_accept_list');
const bcrypt = require('bcryptjs');

exports.register_user_quest_bool = (auth_id) =>
    new Promise(((resolve, reject) => {
        elder_user_quest_accept_list.find({auth_id : auth_id}).then(result => {
            if(result.length == 0){
                return result;
            }else{
                reject({status: 404, message: '이미 존재하는 사용자 퀘스트 테이블 입니다.'});
            }
        }).then(result =>{
            var quest_bool_array = [];
            const new_elder_user_quest_accept_list = new elder_user_quest_accept_list({
                auth_id : auth_id,
                accept_user_list : quest_bool_array
            });

            return new_elder_user_quest_accept_list;
        }).then(new_elder_user_quest_accept_list => {
            new_elder_user_quest_accept_list.save();
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

exports.get_one_quest_list = id =>
    new Promise((resolve, reject) => {
        elder_user_quest_accept_list.find({auth_id : id}).then(results =>
            resolve({
                status : 201,
                message : 'Sucessfully register user quest bool table',
                result : results[0]
            })
        ).catch(err => {
            console.log("err : " + err);
            reject({ status: 500, message: 'Internal Server Error !' })
        })});

exports.push_one_quest_list_in_progress = (id, junior_json) =>
    new Promise((resolve, reject) => {
        elder_user_quest_accept_list.find({auth_id : id}).then(results => {
                console.log('results : ' + results);
                var elder_user_accept_list = results[0];
                console.log('elder_user_accept_list : '+ elder_user_accept_list);
                elder_user_accept_list.accept_user_list.push(junior_json);
                return elder_user_accept_list.save();
        }).then( elder_user_accept_list =>
            resolve({ status: 200, message: '정상적으로 진행중으로 변경되었습니다.' , elder_user_accept_list : elder_user_accept_list})
        ).catch(err => {
            console.log("err : " + err);
            reject({ status: 500, message: 'Internal Server Error !' })
        })});

exports.delete_one_quest_list_by_index = (id, junior_id ,quest_id) =>
    new Promise((resolve, reject) => {
        elder_user_quest_accept_list.find({auth_id : id}).then(results => {
            var elder_user_accept_list = results[0];
            for(var i=0; i<elder_user_accept_list.accept_user_list.length; i++){
                if(elder_user_accept_list.accept_user_list[i].id == junior_id && elder_user_accept_list.accept_user_list[i].quest_id == quest_id){
                    elder_user_accept_list.accept_user_list.splice(i, 1);
                    console.log(elder_user_accept_list.accept_user_list);
                    break;
                }
            }
            console.log(elder_user_accept_list.accept_user_list);
            return elder_user_accept_list.save();
        }).then( elder_user_accept_list =>
            resolve({ status: 200, message: '정상적으로 완료로 변경되었습니다.' , user_quest_table : elder_user_accept_list })
        ).catch(err => {
            console.log("err : " + err);
            reject({ status: 500, message: 'Internal Server Error !' })
        })});
