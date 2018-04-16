var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleShema = new Schema({
 	name: String
});

module.exports = mongoose.model('Role', roleShema);