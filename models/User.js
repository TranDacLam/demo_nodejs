var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var Role = require('./Role');

var userShema = new Schema({
 	full_name: {
        type: String,
        required: [true, 'Full name required']
    },
 	avatar: String,
 	email: {
        type: String,
        unique: [true, 'Email already exists'],
        lowercase: [true, 'Email lowercase'],
    },
 	password: {
        type: String,
        required: [true, 'password required']
    },
    is_active: Boolean,
 	role: { type: Schema.Types.ObjectId, ref: 'Role' },
});

userShema.pre('save', function(next){
    var user = this;
    this.hashPassword(user.password, function(err, hash){
        if(err) return next(err);
        user.password = hash;

        next();
    });
});

userShema.methods.hashPassword = function(candidatePassword, cb){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(candidatePassword, salt, function(err, hash) {
            return cb(null, hash);
        });
    });
};

module.exports = mongoose.model('User', userShema);