const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingCode: { type: String, unique: true, sparse: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  clientName: { type: String },
  clientEmail: { type: String },
  clientPhone: { type: String },
  userName: { type: String },
  userEmail: { type: String },
  userPhone: { type: String },

  salonId: { type: mongoose.Schema.Types.ObjectId },
  salonName: { type: String },

  specialistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialist' },
  specialistName: { type: String },

  slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot' },

  service: { type: String },
  serviceName: { type: String },
  serviceCategory: { type: String },

  date: { type: String }, // YYYY-MM-DD
  time: { type: String }, // HH:MM
  dateTime: { type: Date },
  duration: { type: Number, default: 30 },
  bpPrice: { type: Number, default: 0 },

  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'booked', 'no-show'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['escrow', 'released', 'refunded', 'pending'],
    default: 'pending'
  },

  confirmedAt: { type: Date },
  confirmedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  completedAt: { type: Date },
  qrScannedAt: { type: Date }
}, { timestamps: true });

bookingSchema.statics.generateBookingCode = function () {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

module.exports = mongoose.model('Booking', bookingSchema);
