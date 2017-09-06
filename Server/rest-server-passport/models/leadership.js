// grab the things we need
var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Schema = mongoose.Schema;
var Currency = mongoose.Types.Currency;

var leadershipSchema= new Schema ({
  name:{
    type: String,
  },
  image:{
    type: String,
    required: true,
    default: ""
  },
  designation:{
    type:String,
    default: ""
  },
  abbr:
  {
    type: String,
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
},
  {
  timestamps:true
});


var leadership = mongoose.model('leadership', leadershipSchema);
module.exports= leadership;
