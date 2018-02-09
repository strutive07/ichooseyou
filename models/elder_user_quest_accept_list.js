var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var schema = require('../schemas/elder_user_quest_accept_list');

module.exports = mongoose.model('elder_user_quest_accept_list', schema);
