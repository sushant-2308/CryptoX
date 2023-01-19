const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  current_price: {
    type: String,
    required: true
  },
  high_24h: {
    type: String,
    required: true
  },
  low_24h: {
    type: String,
    required: true
  },
  price_change_24h: {
    type: String,
    required: true
  },
  price_change_percentage_24h: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  last_updated: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
var Asset = mongoose.model("Asset", AssetSchema);
module.exports = Asset
