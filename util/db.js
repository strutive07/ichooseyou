'use strict';

var Promise = require('promise');
var mongoose = require('mongoose');
var config = require('../config.json')
 var MONGODB_URL = config.db.MONGODB_URL;
//var MONGODB_URL = config.db.MONGODB_URL_DEV;
var DB_FILE = config.db.DB;
var DB_URI = 'mongodb://' + MONGODB_URL + '/' + DB_FILE;

mongoose.Promise = global.Promise;
mongoose.set('debug, true');

function connect () {
  console.log("url = " + MONGODB_URL);
  return new Promise((resolve, reject) => {
    if (mongoose.connection.readyState) {
    console.log('reuse connection')
    resolve(mongoose.connection)
  } else {
    console.log('new connection')
    mongoose.connect(DB_URI)
      .then( (connection) => {
      resolve(connection)
    })
  .catch( (err) => {
      console.error(err)
    reject(err)
  })
  }
})
}

exports.connectDB = function () {
  return new Promise((resolve, reject) => {
    connect().then( function (connection) {
      console.log('connection : ' + JSON.stringify(connection));
    resolve(connection)
  }).catch( function (error) {
    reject(error)
  })
})
}

exports.close = function () {
  mongoose.connection.close()
}