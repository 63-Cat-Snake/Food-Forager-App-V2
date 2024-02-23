const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*--------------------------------------- Schema ---------------------------------------*/
const favoriteSchema = new Schema({
  favList: { type: Array, required: true },
});

// exports models
module.exports = mongoose.model('Favorite', favoriteSchema);
