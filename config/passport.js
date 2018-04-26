var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var User = require('./../models/User');

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

passport.use('local-signin', new LocalStrategy({
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

passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    function(req, email, password, done){
        req.checkBody('email', 'Invalid email').notEmpty().isEmail();
        req.checkBody('full_name', 'Invalid full name').notEmpty();
        req.checkBody('password', 'Invalid password').notEmpty().isLength({min: 4});
        var errors = req.validationErrors();
        var user = new User({
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password,
            avatar: req.file ? req.file.filename: '' 
        });
        if(errors || !checkPassword(req.body.password, req.body.password_confirm)){
            var messages = [];
            errors.forEach(function(error){
                if(error.param === 'password' && !checkPassword(req.body.password, req.body.password_confirm)){
                     messages.password_confirm = '.....';
                }else{
                    messages[error.param] = error.msg;
                }
            });
            return done(null, false, { errors: messages });
        }else{
            
            user.save(function(err){
                if(err){ console.log(err) }
                else{
                    return done(null, user);
                }
            })
        }
    }
));

function checkPassword(pw, confirm){
    return pw === confirm;
}

