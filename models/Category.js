var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  	name:{
        type: String,
        required: [true, 'Name required']
    },
  	alias: String,
  	parent_id: String,
});

module.exports = mongoose.model('Category', categorySchema);