var express = require('express');
var router = express.Router();

var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/products')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});
var upload = multer({ storage: storage });

/* GET home page. */
router.get('/add', function(req, res, next) {
  	res.send('oke');
});

module.exports = router;
