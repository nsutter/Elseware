var express = require('express');
var router = express.Router();

var Event = require('../models/Eventmodel');
var User = require('../models/UserModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/event', function(req, res, next) {
  res.render('event', { title: 'Evenements' });
});

router.get('/event', function(req, res, next) {
  res.render('signaler', { title: 'Signaler' });
});

module.exports= router;
