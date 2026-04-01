const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
  },
  subjectCode: { type: String, trim: true },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late'],
    required: [true, 'Attendance status is required'],
  },
  semester: { type: String, trim: true },
}, { timestamps: true });

AttendanceSchema.index({ student: 1, date: -1 });
AttendanceSchema.index({ department: 1, date: -1 });
AttendanceSchema.index({ faculty: 1, date: -1 });
AttendanceSchema.index({ student: 1, subject: 1 });

module.exports = mongoose.model('Attendance', AttendanceSchema);
