const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  employeeId: {
    type: String,
    unique: true,
    sparse: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  designation: {
    type: String,
    enum: ['Assistant Professor', 'Associate Professor', 'Professor', 'HOD'],
  },
  qualification: { type: String, trim: true },
  specialization: { type: String, trim: true },
  experience: { type: Number, min: 0 }, // years
  joiningDate: { type: Date },
  phone: { type: String, trim: true },
  address: { type: String, trim: true },
  subjectsTaught: [{ type: String }],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  isClassTeacher: { type: Boolean, default: false },
  classTeacherOf: { type: String, trim: true }, // "BCA-1"
  maxHoursPerDay: { type: Number, default: 4 },
  // NOTE: `currentDailyHours` and `attendance` are NOT stored —
  //       they are computed on-the-fly from Attendance/Timetable collections
}, { timestamps: true });

FacultySchema.index({ department: 1 });
// user index auto-created by unique:true

module.exports = mongoose.model('Faculty', FacultySchema);
