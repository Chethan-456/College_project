const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    required: true,
  },
  time: { type: String, required: true }, // "8:30-9:30"
  subject: { type: String, required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
  batch: { type: String, trim: true }, // "BCA-1"
  room: { type: String, trim: true },
  type: {
    type: String,
    enum: ['theory', 'practical', 'break'],
    default: 'theory',
  },
});

const TimetableSchema = new mongoose.Schema({
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
  slots: [SlotSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

TimetableSchema.index({ department: 1, year: 1, semester: 1 });

module.exports = mongoose.model('Timetable', TimetableSchema);
