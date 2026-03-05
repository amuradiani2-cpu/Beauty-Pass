const mongoose = require('mongoose');

const specialistServiceSchema = new mongoose.Schema({
  name: { type: String },
  category: { type: String },
  duration: { type: Number, default: 30 },
  bpPrice: { type: Number, default: 10 }
}, { _id: true });

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
}, { _id: true });

const specialistSchema = new mongoose.Schema({
  salonId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  position: { type: String, default: '' },
  description: { type: String, default: '' },
  photoUrl: { type: String, default: '' },
  photo: { type: String, default: '' },

  services: { type: [specialistServiceSchema], default: [] },
  workingHours: { type: mongoose.Schema.Types.Mixed },

  isActive: { type: Boolean, default: true },

  averageRating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: { type: [reviewSchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Specialist', specialistSchema);
