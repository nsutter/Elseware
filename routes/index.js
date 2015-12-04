var express = require('express');
var passport = require('passport');
var router = express.Router();

var Event = require('../models/EventModel');
var UserModel = require('../models/UserModel');

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
    res.redirect('/admin');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/admin', function(req, res) {
    if(req.user.username == 'admin'){
      res.render('admin', { user : req.user });
    }
    else {
      res.redirect('/');
    }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EventReporter' });
  console.log("user :" + req.user);
});

router.get('/event', function(req, res, next) {
  Event.find().limit(2).sort({date: -1}).exec(function (err, ev) {
    console.log(ev);
    res.render('event', { title: 'Événements en cours', data: ev });
  });
});

router.get('/signaler', function(req, res, next) {
  res.render('signaler', { title: 'Signaler un événement' });
});

router.post('/signaler', function(req, res, next) {
  var newEvent = new Event({nom: req.body.nom, description: req.body.message, statut: 0, date: req.body.date, longitude: req.body.longitude, latitude: req.body.latitude, date: req.body.date, ip: req.body.ip});
  newEvent.save();
  res.redirect('/');
  });

module.exports = router;
