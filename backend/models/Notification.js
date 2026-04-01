const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Notification title is required'],
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Notification message is required'],
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // Direct recipients (specific users)
  recipients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  // OR target by role + optional department
  targetRoles: [{
    type: String,
    enum: ['principal', 'hod', 'faculty', 'student'],
  }],
  targetDept: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  // Track read status per user
  readBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  isUrgent: {
    type: Boolean,
    default: false,
  },
  // NOTE: `dot` (UI color) removed — that's a frontend concern
}, { timestamps: true });

NotificationSchema.index({ recipients: 1, createdAt: -1 });
NotificationSchema.index({ targetRoles: 1, createdAt: -1 });

module.exports = mongoose.model('Notification', NotificationSchema);
