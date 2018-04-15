var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Cart = require('./Cart');
var Product = require('./Product');

var cartItemSchema = new Schema({
  	quantity: Number,
  	unit_price: Number,
  	carts: { type: Schema.Types.ObjectId, ref: 'Cart' },
  	products: { type: Schema.Types.ObjectId, ref: 'Product' }
});

module.exports = mongoose.model('CartItem', cartItemSchema);