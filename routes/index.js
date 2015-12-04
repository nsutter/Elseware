var express = require('express');
var passport = require('passport');
var router = express.Router();

var Event = require('../models/EventModel');
var UserModel = require('../models/UserModel');

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

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    UserModel.register(new UserModel({ username : req.body.username }), req.body.password, function(err, UserModel) {
        if (err) {
            return res.render('register', { UserModel : UserModel });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EventReporter' });
  console.log("user :" + req.user);
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
