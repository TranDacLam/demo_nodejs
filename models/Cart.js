var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CartItem = require('./CartItem');
var User = require('./User');

var cartSchema = new Schema({
    _id: Schema.Types.ObjectId,
  	full_name:{
        type: String,
        required: [true, 'Full name required']
    },
  	email: {
        type: String,
        required: [true, 'Email required'],
        lowercase: [true, 'Email lowercase'],
    },
  	phone: {
        type: String,
        required: [true, 'Phone required']
    },
  	note: String,
 	address: {
        type: String,
        required: [true, 'Address required']
    },
 	total: Number,
 	user: { type: Schema.Types.ObjectId, ref: 'User' },
 	status: {
 		type: String,
 		enum: ['Pending', 'Accept', 'Delivered', 'Cancel', 'Reject']
 	},
 	date_order: { 
        type: Date, 
        default: Date.now 
    },
    cart_items: [{ type: Schema.Types.ObjectId, ref: 'CartItem' }],
});

module.exports = mongoose.model('Cart', cartSchema);