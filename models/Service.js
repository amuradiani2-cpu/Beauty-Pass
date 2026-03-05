const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bpPrice: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
  durationMinutes: { type: Number, default: 30 },
  description: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
