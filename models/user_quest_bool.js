var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var schema = require('../schemas/user_quest_bool');

module.exports = mongoose.model('user_quest_bool', schema);
