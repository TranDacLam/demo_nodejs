var mongoose = require('mongoose');
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

module.exports = mongoose.model('User', userShema);