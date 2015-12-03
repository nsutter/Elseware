var mongoose = require('mongoose');

module.exports = mongoose.model('Event',{
	nom: String,
	description: String,
	statut: String,
	date: String,
	type: Number,
  longitude: Number,
  latitude: Number,
  date: Date,
	ip: String
});
