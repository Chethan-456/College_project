const mongoose = require('mongoose');

const CommitteeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Committee name is required'],
    trim: true,
  },
  category: {
    type: String,
    enum: [
      'Academic',
      'Administrative',
      'Welfare',
      'Extracurricular',
      'Career',
      'Technical',
      'Networking',
      'Communication',
    ],
  },
  convenor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  description: { type: String, trim: true },
  schedule: { type: String, trim: true }, // "Monthly - First Monday"
  // NOTE: email/phone removed — use convenor's contact info instead
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

CommitteeSchema.index({ category: 1 });

module.exports = mongoose.model('Committee', CommitteeSchema);
