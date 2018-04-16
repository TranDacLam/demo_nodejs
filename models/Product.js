var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Category = require('./Category');

var productShema = new Schema({
  	name:{
        type: String,
        required: [true, 'Name required']
    },
  	alias: String,
  	image: String,
  	description: String,
  	price:{
        type: Number,
        required: [true, 'Price required']
    },
    category: { 
        type: Schema.Types.ObjectId,
        required: [true, 'Full name required'],
        ref: 'Category' 
    },
});

module.exports = mongoose.model('Product', productShema);