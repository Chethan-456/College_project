const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Department name is required'],
    trim: true,
  },
  code: {
    type: String,
    required: [true, 'Department code is required'],
    unique: true,
    uppercase: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  hod: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // NOTE: `courses` count is NOT stored — computed on-the-fly from Syllabus collection
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

// code index auto-created by unique:true

module.exports = mongoose.model('Department', DepartmentSchema);
