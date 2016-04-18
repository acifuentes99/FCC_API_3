//'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Demo = new Schema({
    algo: String
});

module.exports = mongoose.model('demo', Demo);
