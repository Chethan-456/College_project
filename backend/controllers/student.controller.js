const Student = require('../models/Student');
const User = require('../models/User');

// GET /api/students
exports.getStudents = async (req, res, next) => {
  try {
    const { department, year, search, status, page = 1, limit = 20 } = req.query;
    const filter = { status: status || 'active' };

    if (department) filter.department = department;
    if (year) filter.year = year;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    let query = Student.find(filter)
      .populate('user', 'name email')      // fix #15: populate user for email
      .populate('department', 'name code')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ rollNumber: 1 });

    let [students, total] = await Promise.all([
      query,
      Student.countDocuments(filter),
    ]);

    // Name search after populate
    if (search) {
      const regex = new RegExp(search, 'i');
      students = students.filter(s =>
        (s.user && regex.test(s.user.name)) || regex.test(s.rollNumber)
      );
    }

    res.json({
      success: true,
      data: students,
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/students/:id
exports.getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('user', 'name email role')
      .populate('department', 'name code');
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }
    res.json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
};

// POST /api/students
exports.createStudent = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    const populated = await student.populate([
      { path: 'user', select: 'name email' },
      { path: 'department', select: 'name code' },
    ]);
    res.status(201).json({ success: true, data: populated });
  } catch (err) {
    next(err);
  }
};

// PUT /api/students/:id  (self-access check in controller)
exports.updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }

    // Self-access: if not principal/hod, must be own profile
    if (!['principal', 'hod'].includes(req.user.role)) {
      if (student.user.toString() !== req.user.id) {
        return res.status(403).json({ success: false, error: 'Access denied' });
      }
    }

    Object.assign(student, req.body);
    await student.save();

    const populated = await student.populate([
      { path: 'user', select: 'name email' },
      { path: 'department', select: 'name code' },
    ]);
    res.json({ success: true, data: populated });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/students/:id  (soft delete via status)
exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { status: 'inactive' },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student not found' });
    }

    // Also deactivate the linked user
    await User.findByIdAndUpdate(student.user, { isActive: false });

    res.json({ success: true, message: 'Student deactivated' });
  } catch (err) {
    next(err);
  }
};
