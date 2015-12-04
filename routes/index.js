var express = require('express');
var router = express.Router();

var Event = require('../models/Eventmodel');
var User = require('../models/UserModel');

function nameParse(a,b,c){
  if(a!==undefined)
    return "attentat";
  else if(b!==undefined)
    return "incendie";
  else if(c!==undefined)
    return "catastrophe";
  else {
      return "Pas de catégories";
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EventReporter' });
});

router.get('/event', function(req, res, next) {
  res.render('event', { title: 'Événements' });
});

router.get('/signaler', function(req, res, next) {
  res.render('signaler', { title: 'Signaler un événement' });
});

router.post('/signaler', function(req, res, next) {
  var nom = nameParse(req.body.attentat,req.body.incendie,req.body.catastrophe);
  var newEvent = new Event({nom: nom, description: req.body.message, statut: "0", date: req.body.date, longitude: req.body.longitude, latitude: req.body.latitude, date: req.body.date, ip: req.body.ip});
  newEvent.save();
  res.redirect('/');
  });

module.exports = router;
