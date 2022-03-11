var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User');
var db = mongoose.connection;

// GET del listado de usuarios ordenados por fecha de creación
router.get('/', function (req, res, next) {
  User.find().sort('-creationdate').exec(function (err, users) {
    if (err) res.status(500).send(err);
    else res.status(200).json(users);
  });
});

// GET de un único usuario por su Id
router.get('/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, userinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(userinfo);
  });
});

// POST (crear) de un nuevo usuario
router.post("/signup", function (req, res, next) {
	User.create(req.body, function (err, userinfo) {
		if (err) res.status(500).send(err);
		else res.status(200).send(`User ${userinfo.username} created`);
	});
});

// PUT (actualizar) de un usuario por su Id
router.put("/:id", function (req, res, next) {
	User.findByIdAndUpdate(req.params.id, req.body, function (err, userinfo) {
		if (err) res.status(500).send(err);
		else res.status(200).send(`User ${userinfo.username} updated`);
	});
});

// DELETE (eliminar) de un usuario por su Id
router.delete("/:id", function (req, res, next) {
	User.findByIdAndDelete(req.params.id, function (err, userinfo) {
		if (err) res.status(500).send(err);
		else res.status(200).send(`User ${userinfo.username} deleted`);
	});
});

//POST para iniciar sesion 
router.post("/signin", function (req, res, next){
  const {username, password} = req.body; //lo que se necesita para loguearse

  User.findOne({username})
  .then(user => { //comprobacion nombre usuario
    if(!user) return res.status(404).send('User no found');

    user.comparePassword(password, (err, isMatch) =>{ //comprobacion contraceña
      if(err) return res.status(500).send(err);
      if(!isMatch) return res.status(401).send('Incorrect password');

      User.findOne({username}).then(user => {
        res.json(user);
      });

    });

  });

});

module.exports = router;