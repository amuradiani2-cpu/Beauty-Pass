const mongoose = require('mongoose');

// ======================================
// GROUP
// ======================================
const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  coverImage: { type: String },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  memberCount: { type: Number, default: 0 },
  isPrivate: { type: Boolean, default: false },
  category: { type: String }
}, { timestamps: true });

// ======================================
// POST
// ======================================
const postSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  content: { type: String },
  images: [{ type: String }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likeCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
  isPublic: { type: Boolean, default: true }
}, { timestamps: true });

// ======================================
// COMMENT
// ======================================
const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likeCount: { type: Number, default: 0 }
}, { timestamps: true });

// ======================================
// DIRECT MESSAGE
// ======================================
const directMessageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: { type: String },
  isRead: { type: Boolean, default: false },
  readAt: { type: Date }
}, { timestamps: true });

// ======================================
// CONVERSATION
// ======================================
const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  lastMessage: { type: String },
  lastMessageAt: { type: Date },
  unreadCount: { type: Map, of: Number, default: {} }
}, { timestamps: true });

// ======================================
// NOTIFICATION
// ======================================
const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String }, // like, comment, follow, message, booking
  title: { type: String },
  body: { type: String },
  data: { type: mongoose.Schema.Types.Mixed },
  isRead: { type: Boolean, default: false },
  readAt: { type: Date }
}, { timestamps: true });

// ======================================
// FOLLOW
// ======================================
const followSchema = new mongoose.Schema({
  followerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  followingId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

followSchema.index({ followerId: 1, followingId: 1 }, { unique: true });

const Group = mongoose.model('Group', groupSchema);
const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);
const DirectMessage = mongoose.model('DirectMessage', directMessageSchema);
const Conversation = mongoose.model('Conversation', conversationSchema);
const Notification = mongoose.model('Notification', notificationSchema);
const Follow = mongoose.model('Follow', followSchema);

module.exports = { Group, Post, Comment, DirectMessage, Conversation, Notification, Follow };
