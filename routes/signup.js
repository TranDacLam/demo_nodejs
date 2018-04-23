var express = require('express');
var router = express.Router();

var User = require('./../models/User');


router.get('/', function(req, res, next) {
    res.render('pages/signup');
});

router.post('/', function(req, res, next) {
    if(checkPassword(req.body.password, req.body.password_confirm)){
        var user = new User({
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password,
            role: null
        });
        user.save(function(err){
            if(err){ console.log(err) }
            else{
                res.redirect('admin/login');
            }
        })
    }
});

function checkPassword(pw, confirm){
    return pw === confirm;
}

module.exports = router;
