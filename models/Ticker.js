const mongoose = require('mongoose');

const tickerSchema = new mongoose.Schema({
  en: [{ type: String }],
  mr: [{ type: String }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Ticker', tickerSchema);
