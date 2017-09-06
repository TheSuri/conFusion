var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoritesSchema= new Schema({
  dishes:[ { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' } ],
  postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }
});


var Favorites = mongoose.model('favorite', favoritesSchema);

// make this available to our Node applications
module.exports = Favorites;
