var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User');

var roleShema = new Schema({
	_id: Schema.Types.ObjectId,
 	name: String,
 	users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Role', roleShema);