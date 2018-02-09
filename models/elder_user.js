var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var schema = require('../schemas/elder_user');

module.exports = mongoose.model('elder_user', schema);
