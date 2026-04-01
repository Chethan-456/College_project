const mongoose = require('mongoose');

const ApprovalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Approval title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  type: {
    type: String,
    enum: [
      'Budget Approval',
      'Scholarship Approval',
      'Policy Approval',
      'Event Approval',
      'Infrastructure',
      'Leave Request',
    ],
    required: [true, 'Approval type is required'],
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  amount: { type: Number, min: 0 }, // for budget types
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    default: 'MEDIUM',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  documents: [{ type: String }], // file names / URL list
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  approvedAt: { type: Date },
  rejectedReason: { type: String, trim: true },
}, { timestamps: true });

ApprovalSchema.index({ status: 1, type: 1 });
ApprovalSchema.index({ requester: 1, createdAt: -1 });

module.exports = mongoose.model('Approval', ApprovalSchema);
