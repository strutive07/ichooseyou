var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const quest_info = mongoose.Schema({
    quest_id : Number,
    request_person_id : String,
    title : String,
    context : String,
    purpose : String,
    location : String,
    difficulty : Number, //0 쉬움 1 어려움
    reward : String,
    people_num : Number


    //title, context, purpose, location, difficulty, reward
    //는 quest_info 에 저장

    //의뢰인 이름, 전화번호는 선배 db 에서 불러오기. request_person_Id 로 불러옴.
});

module.exports = quest_info;