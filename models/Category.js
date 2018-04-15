var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('./Product');

var categorySchema = new Schema({
	_id: Schema.Types.ObjectId,
  	name:{
        type: String,
        required: [true, 'Name required']
    },
  	alias: String,
  	parent_id: String,
  	products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Category', categorySchema);