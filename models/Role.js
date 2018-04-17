var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roleShema = new Schema({
 	name: {
        type: String,
        required: [true, 'Name required']
    }
});

module.exports = mongoose.model('Role', roleShema);