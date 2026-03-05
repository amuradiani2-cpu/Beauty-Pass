const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const purchaseSchema = new mongoose.Schema({
  id: Number,
  type: String,
  plan: String,
  price: Number,
  bpAmount: Number,
  includes: mongoose.Schema.Types.Mixed,
  perks: mongoose.Schema.Types.Mixed,
  ts: Date,
  valid_until: Date
}, { _id: false });

const activePlanSchema = new mongoose.Schema({
  name: String,
  purchasedAt: Date,
  expiresAt: Date,
  bpIncluded: Number
}, { _id: false });

const userSchema = new mongoose.Schema({
  login: { type: String },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String },
  birthDate: { type: Date },
  userType: { type: String, default: 'client' }, // client, salon, admin
  role: { type: String },
  isAdmin: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
  isEmailVerified: { type: Boolean, default: false },

  // Balance & points
  balance: { type: Number, default: 0 },
  beautyPoints: { type: Number, default: 0 },
  purchases: { type: [purchaseSchema], default: [] },
  activePlan: { type: activePlanSchema },

  // 2FA
  twoFACode: { type: String },
  twoFACodeExpires: { type: Date },
  twoFAMethod: { type: String },

  // Password reset
  resetPasswordCode: { type: String },
  resetPasswordExpires: { type: Date },

  // Referral
  referralCode: { type: String },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  referralCount: { type: Number, default: 0 },

  // Gamification
  xp: { type: Number, default: 0 },
  totalBookings: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastActivity: { type: Date },

  // Salon-specific fields (when userType === 'salon')
  salonName: { type: String },
  address: { type: String },
  salonAddress: { type: String },
  salonPhone: { type: String },
  salonDescription: { type: String },
  workingHours: { type: String },
  salonId: { type: mongoose.Schema.Types.ObjectId },

  // Salon financial stats
  salonRevenue: { type: Number, default: 0 },
  salonPendingRevenue: { type: Number, default: 0 },
  salonWithdrawnRevenue: { type: Number, default: 0 },
  salonTotalBookings: { type: Number, default: 0 },
  salonCompletedBookings: { type: Number, default: 0 },
  salonCancelledBookings: { type: Number, default: 0 }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', userSchema);
