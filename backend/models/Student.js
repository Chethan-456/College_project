const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  rollNumber: {
    type: String,
    unique: true,
    required: [true, 'Roll number is required'],
    trim: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  year: {
    type: String,
    enum: ['1st Year', '2nd Year', '3rd Year'],
    required: true,
  },
  semester: {
    type: String,
    trim: true,
  },
  admissionDate: { type: Date },
  dob: { type: Date },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  bloodGroup: { type: String, trim: true },
  category: { type: String, trim: true },
  address: { type: String, trim: true },
  phone: { type: String, trim: true },
  father: {
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
  },
  mother: {
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
  },
  cgpa: { type: Number, default: 0, min: 0, max: 10 },
  status: {
    type: String,
    enum: ['active', 'inactive', 'graduated'],
    default: 'active',
  },
}, { timestamps: true });

// Validate semester against year
StudentSchema.pre('save', function (next) {
  const validSemesters = {
    '1st Year': ['1st Semester', '2nd Semester'],
    '2nd Year': ['3rd Semester', '4th Semester'],
    '3rd Year': ['5th Semester', '6th Semester'],
  };
  if (this.semester && this.year) {
    const allowed = validSemesters[this.year];
    if (allowed && !allowed.includes(this.semester)) {
      return next(new Error(`Semester "${this.semester}" is invalid for ${this.year}. Allowed: ${allowed.join(', ')}`));
    }
  }
  next();
});

StudentSchema.index({ department: 1, year: 1 });
// user and rollNumber indexes auto-created by unique:true

module.exports = mongoose.model('Student', StudentSchema);
