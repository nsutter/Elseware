var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/event', function(req, res, next) {
  res.render('event', { title: 'Evenements' });
});

router.get('/signaler', function(req, res, next) {
  res.render('signaler', { title: 'Signaler' });
});

module.exports = router;
