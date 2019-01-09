var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const elder_user_quest_accept_list = mongoose.Schema({
    auth_id : String,
    accept_user_list : Array
}, { usePushEach: true });

module.exports = elder_user_quest_accept_list;
