var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var User = require('./../models/User');

router.get('/', function(req, res, next) {
    if(req.isAuthenticated()){
        res.redirect('/admin/role/list');
    }else{
        res.render('admin/auth/login', { title: 'Express' });
    }
    
});

router.post('/', passport.authenticate('local-signin', {
    failureRedirect: '/admin/signin', 
    successRedirect: '/admin/role/list'
}));

router.get('/logout', checkAdmin, function (req, res) {
    req.logout();
    res.redirect('/admin/signin');
});

function checkAdmin(req, res, next){
   
    if(req.isAuthenticated()){
      next();
    }else{
      res.redirect('/admin/signin');
    }
}

module.exports = router;
