const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  salonId: { type: mongoose.Schema.Types.ObjectId },
  salonName: { type: String },
  specialistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialist' },
  specialistName: { type: String },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  serviceName: { type: String },
  serviceCategory: { type: String },
  category: { type: String },

  date: { type: String }, // YYYY-MM-DD
  time: { type: String }, // HH:MM
  times: { type: [String], default: [] }, // legacy batch times

  duration: { type: Number, default: 30 }, // minutes
  bpPrice: { type: Number, default: 10 },

  isBooked: { type: Boolean, default: false },
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }
}, { timestamps: true });

module.exports = mongoose.model('Slot', slotSchema);
