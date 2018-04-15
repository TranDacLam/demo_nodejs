var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Category = require('./Category');
var CartItem = require('./CartItem');

var productShema = new Schema({
    _id: Schema.Types.ObjectId,
  	name:{
        type: String,
        required: [true, 'Name required']
    },
  	alias: String,
  	image: String,
  	category: { 
        type: Schema.Types.ObjectId,
        required: [true, 'Full name required'],
        ref: 'Category' 
    },
  	description: String,
  	price:{
        type: Number,
        required: [true, 'Price required']
    },
    cart_item: [{ type: Schema.Types.ObjectId, ref: 'CartItem' }],
});

module.exports = mongoose.model('Product', productShema);