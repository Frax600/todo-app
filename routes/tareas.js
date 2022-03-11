let express = require("express");
let router = express.Router();
const Tarea = require("../models/Tarea");
const User = require("../models/User");

//crear una tarea
router.post("/add", function (req, res, next) {
	const { nombre, userId } = req.body;

	User.findById(userId, (err, u) => {
		let tarea = new Tarea({
			user: u,
			nombre,
		});

		u.tareas.push(tarea);

		u.save(function (err) {
			if (err) return res.status(500).send(err);
			tarea.save(function (err) {
				if (err) return res.status(500).send(err);
				res.send("Tarea added");
			});
		});
	});
});

// modificar una tarea por su id
router.put("/:id", function (req, res, next) {
	Tarea.findByIdAndUpdate(req.params.id, req.body, function (err, tareainfo) {
		if (err) res.status(500).send(err);
		else res.status(200).send("Tarea updated");
	});
});

//marcar tarea como hecha
router.put("/done/:id", function (req, res, next) {
	Tarea.findByIdAndUpdate(
		req.params.id,
		{ hecho: true },
		function (err, tareainfo) {
			if (err) res.status(500).send(err);
			else res.status(200).send("Tarea mark as done");
		}
	);
});

//eliminar todas las tareas de un usuario
router.delete("/empty/:id", function (req, res, next) {
	const id = req.params.id;

	User.findById(id, (err, user) => {
		console.log(user.tareas);
		user.tareas.forEach((tarea, i) => {
			
			//borra las tareas del modelo Tarea
			Tarea.findByIdAndDelete(tarea, function (err, tarea) {
			
				if (err) res.status(500).send(err);
				else res.sendStatus(200);
				
			});

		});

		//para vaciar el array tareas del modelo USER
		user.tareas.length = 0;
	});

	if (err) res.status(500).send(err);
	else res.status(200).send("Tareas deleted");
});

//mostrar tareas activas
router.get("/active", function (req, res, next) {
	Tarea.find({ hecho: false })
		.then((terea) => {
			res.json(terea);
		})
		.catch((err) => {
			console.log(err);
		});
});

module.exports = router;
