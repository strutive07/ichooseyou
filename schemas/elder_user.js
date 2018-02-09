var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name : String,
    auth_id : String,
    hashed_password : String,
    phone_number : Number,
    score : Number,
    is_elder : Boolean,
    quest_id : Number,
    first_login : Boolean,
    created_at : String,
    temp_random_string : String,
    temp_temp_random_string_time : String,
    temp_password : String,
    temp_password_time : String
});

module.exports = userSchema;