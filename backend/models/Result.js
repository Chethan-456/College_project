const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  marksObtained: {
    type: Number,
    min: 0,
  },
  grade: {
    type: String,
    trim: true,
  },
  remarks: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

// Prevent duplicate results per student per exam
ResultSchema.index({ exam: 1, student: 1 }, { unique: true });
ResultSchema.index({ student: 1, createdAt: -1 });

module.exports = mongoose.model('Result', ResultSchema);
