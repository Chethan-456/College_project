const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Direct message
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // Broadcast targeting
  toRole: {
    type: String,
    enum: ['all', 'hods', 'faculty', 'students'],
  },
  toDept: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
  },
  body: {
    type: String,
    required: [true, 'Message body is required'],
    trim: true,
  },
  // Per-user read tracking (supports broadcast messages)
  readBy: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    readAt: { type: Date, default: Date.now },
  }],
  // Soft-delete per user (users who dismissed this message)
  deletedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, { timestamps: true });

MessageSchema.index({ to: 1, createdAt: -1 });
MessageSchema.index({ from: 1, createdAt: -1 });
MessageSchema.index({ toRole: 1, createdAt: -1 });

module.exports = mongoose.model('Message', MessageSchema);
