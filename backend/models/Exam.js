const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Exam title is required'],
    trim: true,
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
  },
  subjectCode: { type: String, trim: true },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  year: { type: String },
  semester: { type: String },
  type: {
    type: String,
    enum: ['theory', 'practical', 'internal', 'external'],
  },
  date: { type: Date },
  time: { type: String, trim: true }, // "10:00 AM - 1:00 PM"
  duration: { type: String, trim: true }, // "3 hours"
  room: { type: String, trim: true },
  maxMarks: { type: Number },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  // NOTE: Results are stored in a separate Result model (not embedded here)
  //       to avoid 16MB BSON limit and improve query performance.
}, { timestamps: true });

ExamSchema.index({ department: 1, semester: 1 });
ExamSchema.index({ status: 1, date: 1 });

module.exports = mongoose.model('Exam', ExamSchema);
