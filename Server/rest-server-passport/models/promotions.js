// grab the things we need
var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Schema = mongoose.Schema;
var Currency = mongoose.Types.Currency;

var promotionSchema= new Schema ({
  name:{
    type: String,
  },
  image:{
    type: String,
    required: true,
    default: ""
  },
  label:{
    type:String,
    default: ""
  },
  price:
  {
    type: Currency,
    required:true
  },
  description: {
      type: String,
      required: true
  },
  featured: {
      type: Boolean,
      default:false
  }
},{
  timestamps:true
});


var Promotions = mongoose.model('promotion', promotionSchema);
module.exports= Promotions;
