'use strict';
// quest_id : String
// request_person_id : Number,
//     title : String,
//     context : String,
//     purpose : String,
//     location : String,
//     difficulty : Boolean, //0 쉬움 1 어려움
//     reward : String


//title, context, purpose, location, difficulty, reward
//는 quest_info 에 저장

//의뢰인 이름, 전화번호는 선배 db 에서 불러오기. request_person_Id 로 불러옴.
const quest_info = require('../models/quest_info');
const bcrypt = require('bcryptjs');
const db = require('mongodb');

exports.create_quest = (quest_id,request_person_id, title, context, purpose, location, difficulty, reward) =>
    new Promise(((resolve, reject) => {
        const new_quest_info = new quest_info({
            quest_id : quest_id,
            request_person_id : request_person_id,
            title : title,
            context : context,
            purpose : purpose,
            location : location,
            difficulty : difficulty, //0 쉬움 1 어려움
            reward : reward
        });
        new_quest_info.save().then(() => resolve({
            status : 201,
            message : 'Sucessfully register quest'
        })).catch(err =>{
            if(err.code == 11000){
                reject({ status: 409, message: 'User Already Registered !'});
            }else{
                reject({ status: 500, message: 'Inasdfasfahohohohohohohohoternal Server Error !' });
            }
        });
    }));




exports.get_all_quest = () =>
    new Promise((resolve, reject) => {
        quest_info.find().then(results =>
            resolve(results)
        ).catch(err => {
            
            reject({ status: 500, message: 'Internal Server Error !' })
        })});

exports.get_one_quest = id =>
    new Promise((resolve, reject) => {
        quest_info.find({quest_id : id}).then(results =>{
            resolve(results[0]);
        }).catch(err => {
            ////console.log("err : " + err);
            reject({ status: 500, message: 'Internal Server Error !' })
        })});

exports.people_num_change = (quest_id, dn) =>
    new Promise((resolve, reject) => {
        quest_info.find({quest_id : quest_id}).then(results => {
            var re_quest_info = results[0];
            var people_num = results[0].people_num;
            people_num = people_num + dn;
            quest_info.update({quest_id : quest_id}, {$set : {people_num : people_num}}, function(err, output){
                if(err){
                    //console.log(err);
                }
                //console.log('output : ' + JSON.stringify(output));
            });
            return results[0];
        }).then( results =>
            resolve({ status: 200, message: 1})
        ).catch(err => {
            //console.log("err : " + err);
            reject({ status: 500, message: 'Internal Server Error !' })
        })});

