const Department = require('../models/Department');
const Syllabus = require('../models/Syllabus');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');

// GET /api/departments
exports.getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find({ isActive: true })
      .populate('hod', 'name email')
      .sort({ name: 1 });

    res.json({ success: true, data: departments });
  } catch (err) {
    next(err);
  }
};

// GET /api/departments/:id
exports.getDepartment = async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id).populate('hod', 'name email');
    if (!department) {
      return res.status(404).json({ success: false, error: 'Department not found' });
    }
    res.json({ success: true, data: department });
  } catch (err) {
    next(err);
  }
};

// GET /api/departments/:id/stats  (computed course count — fix #13)
exports.getDepartmentStats = async (req, res, next) => {
  try {
    const deptId = req.params.id;

    const [studentCount, facultyCount, courseCount] = await Promise.all([
      Student.countDocuments({ department: deptId, status: 'active' }),
      Faculty.countDocuments({ department: deptId }),
      Syllabus.aggregate([
        { $match: { department: require('mongoose').Types.ObjectId.createFromHexString(deptId) } },
        { $unwind: '$subjects' },
        { $group: { _id: null, count: { $sum: 1 } } },
      ]),
    ]);

    res.json({
      success: true,
      data: {
        studentCount,
        facultyCount,
        courseCount: courseCount[0]?.count || 0,
      },
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/departments
exports.createDepartment = async (req, res, next) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json({ success: true, data: department });
  } catch (err) {
    next(err);
  }
};

// PUT /api/departments/:id
exports.updateDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('hod', 'name email');
    if (!department) {
      return res.status(404).json({ success: false, error: 'Department not found' });
    }
    res.json({ success: true, data: department });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/departments/:id  (soft delete)
exports.deleteDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!department) {
      return res.status(404).json({ success: false, error: 'Department not found' });
    }
    res.json({ success: true, message: 'Department deactivated' });
  } catch (err) {
    next(err);
  }
};
