var express = require('express');
var router = express.Router();

/* GET home page. */
// var __dirname = '../../client/i-choose-you'


router.get('/', function(req, res, next) {
    res.redirect('http://ssumon.com/');
});

module.exports = router;
