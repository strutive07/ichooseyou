var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const user_quest_bool_schema = mongoose.Schema({
    auth_id : String,
    quest_size : Number,
    quest_bool : Array
},{ usePushEach: true });

module.exports = user_quest_bool_schema;
