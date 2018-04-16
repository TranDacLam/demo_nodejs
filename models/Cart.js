var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./User');

var cartSchema = new Schema({
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
 	status: {
 		type: String,
 		enum: ['Pending', 'Accept', 'Delivered', 'Cancel', 'Reject']
 	},
 	date_order: { 
        type: Date, 
        default: Date.now 
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Cart', cartSchema);