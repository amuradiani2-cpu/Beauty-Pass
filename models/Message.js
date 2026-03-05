const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senderType: { type: String, enum: ['client', 'salon'], default: 'client' },
  senderName: { type: String },

  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverType: { type: String, enum: ['client', 'salon'], default: 'client' },

  message: { type: String, required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },

  isRead: { type: Boolean, default: false },
  readAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
