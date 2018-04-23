var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var User = require('./../models/User');

router.get('/', function(req, res, next) {
    res.render('admin/auth/login', { title: 'Express' });
});

router.post('/', passport.authenticate('local', {failureRedirect: '/', successRedirect: '/'}));

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done){
        User.findOne({ 'email': email }, function (err, user) {
            if (err) console.log(err);
            if(user){
                bcrypt.compare(password, user.password, function(err, status) {
                    if(err) throw err;
                    if(status){
                        return done(null, user);
                    }else{
                       return done(null, false, { message: 'Tài Khoảng Không Đúng' });
                    }
                });
            }else{
                return done(null, false, { message: 'Tài Khoảng Không Đúng' });
            }
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.mail);
});

passport.deserializeUser((email, done) => {
    User.findOne({ 'email': email }, function (err, user) {
        if (err) console.log(err);
        // Prints "Space Ghost is a talk show host".
        console.log(user)
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    });
});

module.exports = router;
