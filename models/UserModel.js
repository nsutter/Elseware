var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	nom: String,
	pwd: String
});
