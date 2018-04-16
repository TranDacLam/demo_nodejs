var express = require('express');
var router = express.Router();

var Role = require('./../models/Role');

router.get('/list', function(req, res, next) {
  	Role.find(function(err, roles){
  		console.log(roles);
  		res.render('admin/roles/list-role', {roles: roles});
  	})
});

router.get('/add', function(req, res, next) {
  	res.render('admin/roles/add-role');
});

router.post('/add', function(req, res, next) {
  	var role = new Role({
  		name: req.body.name
  	})

  	role.save(function(err){
  		if(err){

  		}
  		res.redirect('/admin/role/list');
  	});
});

router.get('/edit/:id', function(req, res, next) {
	const id = req.params.id;
	Role.findById({'_id': id}, function(err, role){
		res.render('admin/roles/edit-role', {role: role});
	});
});

router.post('/edit/:id', function(req, res, next) {
	const id = req.params.id;
	Role.findById({'_id': id}, function(err, role){
		role.name = req.body.name;
		role.save(function(err){
			res.redirect('/admin/role/list');
		});
	});
});

module.exports = router;
