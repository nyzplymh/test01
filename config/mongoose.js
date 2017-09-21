var mongoose = require('mongoose');

var mongoConfig = require('./config');

module.exports = function(){
	var db = mongoose.connect(mongoConfig.mongodb);
	return db ;
};