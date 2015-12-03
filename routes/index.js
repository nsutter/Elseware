var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EventReporter' });
});

router.get('/event', function(req, res, next) {
  res.render('event', { title: 'Evenements' });
});

router.get('/signaler', function(req, res, next) {
  res.render('signaler', { title: 'Signaler' });
});

router.post('/signaler', function(req, res, next) {
  console.log(req.body.nom + "/" + req.body.date);
  console.log(req.body.message);
  console.log(req.body.latitude + "/" + req.body.longitude);
  });

module.exports = router;
