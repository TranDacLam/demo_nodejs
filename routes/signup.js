var express = require('express');
var router = express.Router();
var csrf = require('csurf');

var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  }
});
var upload = multer({ storage: storage });

// setup route middlewares
var csrfProtection = csrf();

var User = require('./../models/User');


router.get('/', csrfProtection, function(req, res, next) {
    var user = new User({
        full_name: '',
        email: '',
        password: ''
    });
    res.render('pages/signup', {errors: null, csrfToken: req.csrfToken(), user: user });
});

router.post('/', upload.single('avatar'), function(req, res, next) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('full_name', 'Invalid full name').notEmpty();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({min: 4});
    var errors = req.validationErrors();
    console.log(req.file)
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
        res.render('pages/signup', {errors: messages, csrfToken: req.body._csrf, user: user})
    }else{
        
        user.save(function(err){
            if(err){ console.log(err) }
            else{
                res.redirect('admin/signin');
            }
        })
    }
});

function checkPassword(pw, confirm){
    return pw === confirm;
}

module.exports = router;
