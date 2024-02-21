const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*--------------------------------------- Schema ---------------------------------------*/
const restaurantSchema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  data: { type: Array, required: true },
  cuisine: { type: String, required: true },
  budget: { type: Number, required: true },
  distance: { type: Number, required: true },
});

// exports models
module.exports = mongoose.model('Restaurant', restaurantSchema);
