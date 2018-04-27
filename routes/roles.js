var express = require('express');
var router = express.Router();
const assert = require('assert');

var Role = require('./../models/Role');

router.get('/list', checkAdmin, function(req, res, next) {
  	Role.find(function(err, roles){
  		res.render('admin/roles/list-role', {roles: roles});
  	})
});

router.get('/add', checkAdmin, function(req, res, next) {
  	res.render('admin/roles/add-role',{errors: null});
});

router.post('/add', checkAdmin, function(req, res, next) {
  	var role = new Role({
  		name: req.body.name
  	})

  	role.save(function(err){
  		if(err){
            req.checkBody('name', err.errors['name'].message).notEmpty();
            var errors = req.validationErrors();
            console.log(errors)
            res.render('admin/roles/add-role', {errors: errors});
  		}else{
  		    res.redirect('/admin/role/list');
        }
  	});
});

router.get('/edit/:id', checkAdmin, function(req, res, next) {
	const id = req.params.id;
	Role.findById({'_id': id}, function(err, role){
		res.render('admin/roles/edit-role', {role: role});
	});
});

router.post('/edit/:id', checkAdmin, function(req, res, next) {
	const id = req.params.id;
	Role.findById({'_id': id}, function(err, role){
		role.name = req.body.name;
		role.save(function(err){
			res.redirect('/admin/role/list');
		});
	});
});

router.get('/del/:id', checkAdmin, function(req, res, next) {
    const id = req.params.id;
    Role.remove({'_id': id}, function(err){
        res.redirect('/admin/role/list');
    });
});

function checkAdmin(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/signin');
    }
}

module.exports = router;
