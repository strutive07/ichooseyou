var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var schema = require('../schemas/quest_info');

module.exports = mongoose.model('quest_info', schema);
