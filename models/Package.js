const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  plan: { type: String, required: true },
  price: { type: Number, default: 0 },
  tokens: { type: Number, default: 0 }, // BP tokens included
  includes: { type: mongoose.Schema.Types.Mixed },
  perks: { type: mongoose.Schema.Types.Mixed },
  description: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
