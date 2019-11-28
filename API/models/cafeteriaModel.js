const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CafeteriaSchema = new Schema({
  id: {
    type: Number,
    required: 'Enter the item id'
  },
  title: {
    type: String,
    required: 'Enter the item name'
  },
  price: {
    type: Number,
    required: 'Enter the item price'
  }
});

module.exports = mongoose.model('Cafeteria', CafeteriaSchema);
