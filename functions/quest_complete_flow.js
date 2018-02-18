'use strict';

//
// var start_time = new Date();
// var end_time = new Date();
// console.log((end_time.getTime() - start_time.getTime())/1000)
//
const user = require('../models/user');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
// const config = require('../config/config');


// //선배쪽
//
// 보낼 떄 시간
// 받는 후배 id
//
// /users/quest/complete/선배id/후배id/quest_id/random_string
//
// 형식으로 보냄
//
// 보낼때 선배 id Token 도 같이 보냄
// //후배쪽
// 후배 쪽에서는
// 1. Id 가 일치하는지 체크
// 2. 시간이 3분 이내 인지 체크
// 3. 선배 Token 과 선배 id 가 일치하는지 체크
//
// 위의 조건을 만족할시
// 후배 id 로 user_quest_bool 테이블 검색해서
// 완료 배열 에서 quest_id 위치를 true 로 바꾸고
// ajax 로



exports.complete_quest_init = (id,elder_id, quest_id) =>
    new Promise((resolve, reject) => {
        const random = randomstring.generate(8);
        user.find({auth_id : id}).then(results => {
                if(results.length == 0){
                    reject({ status: 404, message: 'User Not Found !' });
                }else{
                    let user = results[0];
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(random, salt);
                    user.temp_random_string = hash;
                    user.temp_temp_random_string_time = new Date();
                    return user.save();
                }
            }).then(user => {
                var link = 'http://52.79.41.31:3000/api/v1g1/senior/complete/' + id + '/' + elder_id + '/' + quest_id + '/'+ random;
                resolve({ status: 200, message: 'click link to finish quest', link : link });
            }).catch(err => {
                console.log('err : ', err);
                reject({ status: 500, message: 'Internal Server Error !' });
        });

    });

exports.complete_quest_finish = (id, elder_id, quest_id, temp_random_string) =>
    new Promise((resolve, reject) => {
        user.find({auth_id : id}).then(results => {
            let user = results[0];
            const time_gap = new Date() - new Date(user.temp_temp_random_string_time);
            const seconds = Math.floor(time_gap/1000);
            if(seconds <= 120){
                console.log('temp_random_string : ' + temp_random_string );
                return user;
            }else{
                reject({ status: 401, message: 'Time Out ! Try again' });
            }
        }).then(user => {
            if(bcrypt.compareSync(temp_random_string, user.temp_random_string)){
                user.temp_random_string = undefined;
                user.temp_temp_random_string_time = undefined;
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