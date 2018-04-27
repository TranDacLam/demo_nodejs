var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var csrf = require('csurf');
var csrfProtection = csrf();

var User = require('./../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('pages/index', { title: 'Express' });
});

router.get('/signup', csrfProtection, function(req, res, next) {
    if(req.isAuthenticated()){
        res.redirect('/');
    }else{
        var messages = req.flash('error');
        var user = new User({
            full_name: '',
            email: '',
            password: ''
        });
        res.render('pages/signup', {messages: messages, csrfToken: req.csrfToken(), user: user, hasErrors: messages.length > 0});
    }
});

router.post('/signup', passport.authenticate('local-signup', {
    failureRedirect: '/signup', 
    successRedirect: '/',
    badRequestMessage: '',
    failureFlash: true
}));

router.get('/signin', function(req, res, next) {
    if(req.isAuthenticated()){
        res.redirect('/');
    }else{
        var messages = req.flash('error');
        res.render('pages/signin', { title: 'Express', messages: messages, hasErrors: messages.length > 0 });
    }
    
});

router.post('/signin', passport.authenticate('local-signin', {
    failureRedirect: '/signin', 
    successRedirect: '/',
    failureFlash: true
}));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

function checkAdmin(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/signin');
    }
}


module.exports = router;
