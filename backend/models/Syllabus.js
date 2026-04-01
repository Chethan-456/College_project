const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subject name is required'],
    trim: true,
  },
  code: {
    type: String,
    required: [true, 'Subject code is required'],
    trim: true,
  },
  credits: { type: Number, min: 0 },
  type: {
    type: String,
    enum: ['theory', 'practical'],
  },
  theoryHours: { type: Number, min: 0 },
  practicalHours: { type: Number, min: 0 },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
  },
  objectives: [{ type: String }],
  prerequisites: [{ type: String }],
  unitsDone: { type: Number, default: 0, min: 0 },
  totalUnits: { type: Number, min: 0 },
});

const SyllabusSchema = new mongoose.Schema({
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  subjects: [SubjectSchema],
  academicYear: { type: String, trim: true }, // "2024-25"
}, { timestamps: true });

SyllabusSchema.index({ department: 1, year: 1, semester: 1 });

module.exports = mongoose.model('Syllabus', SyllabusSchema);
