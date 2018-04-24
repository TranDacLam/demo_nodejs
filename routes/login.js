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

router.get('/test', function(req, res, next) {
    if(req.isAuthenticated()){
        res.send('oke');
    }else{
        res.send('not oke');
    }
    
});

router.post('/', passport.authenticate('local', {failureRedirect: '/admin/login', successRedirect: '/admin/role/list'}));

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done){
        User.findOne({ 'email': email }, function (err, user) {
            console.log(1)
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

router.get('/logout', checkAdmin, function (req, res) {
    req.logout();
    res.redirect('/admin/login');
});

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById({ '_id': id }, function (err, user) {
        console.log(2)
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

function checkAdmin(req, res, next){
   
    if(req.isAuthenticated()){
      next();
    }else{
      res.redirect('/admin/login');
    }
}

module.exports = router;
