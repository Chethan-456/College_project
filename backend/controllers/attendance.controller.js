const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');

// POST /api/attendance  — mark single
exports.markAttendance = async (req, res, next) => {
  try {
    // Attach faculty id from logged-in user
    const faculty = await Faculty.findOne({ user: req.user.id });
    const data = { ...req.body };
    if (faculty) data.faculty = faculty._id;

    const record = await Attendance.create(data);
    res.status(201).json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
};

// POST /api/attendance/bulk
exports.bulkMarkAttendance = async (req, res, next) => {
  try {
    const { subject, subjectCode, date, semester, department, records } = req.body;
    const faculty = await Faculty.findOne({ user: req.user.id });

    const docs = records.map(r => ({
      student: r.student,
      subject,
      subjectCode,
      date,
      semester,
      department,
      status: r.status,
      faculty: faculty?._id,
    }));

    const result = await Attendance.insertMany(docs);
    res.status(201).json({ success: true, data: result, message: `${result.length} records created` });
  } catch (err) {
    next(err);
  }
};

// GET /api/attendance/student/:studentId
exports.getStudentAttendance = async (req, res, next) => {
  try {
    const { subject, from, to } = req.query;
    const filter = { student: req.params.studentId };
    if (subject) filter.subject = subject;
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }

    // Self-access check for students
    if (req.user.role === 'student') {
      const student = await Student.findById(req.params.studentId);
      if (!student || student.user.toString() !== req.user.id) {
        return res.status(403).json({ success: false, error: 'Access denied' });
      }
    }

    const records = await Attendance.find(filter)
      .populate('faculty', 'user')
      .sort({ date: -1 });

    res.json({ success: true, data: records });
  } catch (err) {
    next(err);
  }
};

// GET /api/attendance/summary/:studentId
exports.getAttendanceSummary = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;

    const summary = await Attendance.aggregate([
      { $match: { student: require('mongoose').Types.ObjectId.createFromHexString(studentId) } },
      {
        $group: {
          _id: '$subject',
          subjectCode: { $first: '$subjectCode' },
          total: { $sum: 1 },
          present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
          absent: { $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] } },
          late: { $sum: { $cond: [{ $eq: ['$status', 'late'] }, 1, 0] } },
        },
      },
      {
        $addFields: {
          percentage: { $round: [{ $multiply: [{ $divide: ['$present', '$total'] }, 100] }, 1] },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({ success: true, data: summary });
  } catch (err) {
    next(err);
  }
};

// GET /api/attendance/department/:deptId
exports.getDeptAttendance = async (req, res, next) => {
  try {
    const { from, to } = req.query;
    const match = { department: require('mongoose').Types.ObjectId.createFromHexString(req.params.deptId) };
    if (from || to) {
      match.date = {};
      if (from) match.date.$gte = new Date(from);
      if (to) match.date.$lte = new Date(to);
    }

    const overview = await Attendance.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$subject',
          total: { $sum: 1 },
          present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
          absent: { $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] } },
        },
      },
      {
        $addFields: {
          percentage: { $round: [{ $multiply: [{ $divide: ['$present', '$total'] }, 100] }, 1] },
        },
      },
      { $sort: { percentage: -1 } },
    ]);

    res.json({ success: true, data: overview });
  } catch (err) {
    next(err);
  }
};

// PUT /api/attendance/:id  — correct a record
exports.updateAttendance = async (req, res, next) => {
  try {
    const record = await Attendance.findByIdAndUpdate(req.params.id, { status: req.body.status }, {
      new: true,
      runValidators: true,
    });
    if (!record) {
      return res.status(404).json({ success: false, error: 'Attendance record not found' });
    }
    res.json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
};
