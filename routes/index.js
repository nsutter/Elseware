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
router.get('/info/:id', function(req, res, next) {
  Event.findOne({_id: req.params.id}, function (err, resu){
    res.render('info', { title: 'data.nom', data: resu });
  });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'EventReporter' });
});

router.get('/event', function(req, res, next) {
  Event.find().limit(2).sort({date: -1}).exec(function (err, ev) {
    res.render('event', { title: 'Événements', data: ev });
  });
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

  var server = require('http').createServer(router),
      io = require('socket.io').listen(server),
      ent = require('ent'),
      fs = require('fs');

	var io = require('socket.io').listen(server);

	// quand un client se connecte
  io.sockets.on('connection', function (socket, pseudo, room) {

    socket.on('nouveau_client', function(pseudo, room) {
        socket.join(room);
        console.log("yolo", pseudo, room);
        pseudo = ent.encode(pseudo);
        socket.broadcast.to(room).emit('nouveau_client', pseudo);
    });

    socket.on('message', function (message, pseudo, room) {
          message = ent.encode(message);
          socket.broadcast.to(room).emit('message', {pseudoem: pseudo, message: message});
      });

  });
	server.listen(3001);

module.exports = router;
