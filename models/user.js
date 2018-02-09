var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var schema = require('../schemas/user');

module.exports = mongoose.model('users', schema);
