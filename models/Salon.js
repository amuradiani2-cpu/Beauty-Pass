const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  comment: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
}, { _id: true });

const galleryItemSchema = new mongoose.Schema({
  type: { type: String, enum: ['photo', 'video'], default: 'photo' },
  url: { type: String },
  caption: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
}, { _id: true });

const coordinatesSchema = new mongoose.Schema({
  lat: { type: Number },
  lng: { type: Number }
}, { _id: false });

const salonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: String },
  categories: { type: [String], default: [] },
  services: { type: [String], default: [] },

  // Gallery & media
  gallery: { type: [galleryItemSchema], default: [] },
  photos: { type: [String], default: [] },
  videos: { type: [String], default: [] },
  salonPhotoUrl: { type: String },

  // Contact & info
  phone: { type: String },
  description: { type: String },
  workingHours: { type: mongoose.Schema.Types.Mixed },

  // Location
  coordinates: { type: coordinatesSchema },

  // Ratings & reviews
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: { type: [reviewSchema], default: [] },

  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Salon', salonSchema);
