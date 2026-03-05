const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  key: { type: String, default: 'main', unique: true },

  // General site settings
  siteName: { type: String, default: 'Beauty Pass' },
  siteDescription: { type: String },
  maintenanceMode: { type: Boolean, default: false },

  // Referral settings
  referralBonusBP: { type: Number, default: 10 },
  referralBonusXP: { type: Number, default: 20 },

  // BP/Gamification settings
  bookingXP: { type: Number, default: 10 },
  reviewXP: { type: Number, default: 5 },
  levelUpBPMultiplier: { type: Number, default: 10 },

  // Cancellation policy
  freeCancellationDays: { type: Number, default: 2 },

  // Custom fields for future expansion
  extra: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
