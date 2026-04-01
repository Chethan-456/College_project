const Faculty = require('../models/Faculty');
const Timetable = require('../models/Timetable');
const Attendance = require('../models/Attendance');

// GET /api/faculty
exports.getFaculty = async (req, res, next) => {
  try {
    const { department, search, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (department) filter.department = department;
    if (search) {
      // Search in populated user name — we'll filter after populate
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    let query = Faculty.find(filter)
      .populate('user', 'name email isActive')
      .populate('department', 'name code')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    let [faculty, total] = await Promise.all([
      query,
      Faculty.countDocuments(filter),
    ]);

    // Client-side name search (after populate)
    if (search) {
      const regex = new RegExp(search, 'i');
      faculty = faculty.filter(f => f.user && regex.test(f.user.name));
    }

    res.json({
      success: true,
      data: faculty,
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/faculty/:id
exports.getFacultyById = async (req, res, next) => {
  try {
    const faculty = await Faculty.findById(req.params.id)
      .populate('user', 'name email role')
      .populate('department', 'name code');
    if (!faculty) {
      return res.status(404).json({ success: false, error: 'Faculty not found' });
    }
    res.json({ success: true, data: faculty });
  } catch (err) {
    next(err);
  }
};

// POST /api/faculty
exports.createFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.create(req.body);
    const populated = await faculty.populate([
      { path: 'user', select: 'name email' },
      { path: 'department', select: 'name code' },
    ]);
    res.status(201).json({ success: true, data: populated });
  } catch (err) {
    next(err);
  }
};

// PUT /api/faculty/:id  (self-access handled by checking user field)
exports.updateFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ success: false, error: 'Faculty not found' });
    }

    // Self-access check: if not principal/hod, must be own profile
    if (!['principal', 'hod'].includes(req.user.role)) {
      if (faculty.user.toString() !== req.user.id) {
        return res.status(403).json({ success: false, error: 'Access denied' });
      }
    }

    // HOD can only update faculty in own department
    if (req.user.role === 'hod' && faculty.department.toString() !== req.user.department) {
      return res.status(403).json({ success: false, error: 'Access denied: not your department' });
    }

    Object.assign(faculty, req.body);
    await faculty.save();

    const populated = await faculty.populate([
      { path: 'user', select: 'name email' },
      { path: 'department', select: 'name code' },
    ]);
    res.json({ success: true, data: populated });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/faculty/:id
exports.deleteFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id);
    if (!faculty) {
      return res.status(404).json({ success: false, error: 'Faculty not found' });
    }
    res.json({ success: true, message: 'Faculty removed' });
  } catch (err) {
    next(err);
  }
};

// GET /api/faculty/:id/timetable
exports.getFacultyTimetable = async (req, res, next) => {
  try {
    const timetables = await Timetable.find({ 'slots.faculty': req.params.id })
      .populate('department', 'name code');

    // Extract only slots for this faculty
    const schedule = [];
    timetables.forEach(tt => {
      tt.slots.forEach(slot => {
        if (slot.faculty && slot.faculty.toString() === req.params.id) {
          schedule.push({
            day: slot.day,
            time: slot.time,
            subject: slot.subject,
            batch: slot.batch,
            room: slot.room,
            type: slot.type,
            department: tt.department,
            year: tt.year,
            semester: tt.semester,
          });
        }
      });
    });

    res.json({ success: true, data: schedule });
  } catch (err) {
    next(err);
  }
};

// GET /api/faculty/:id/hours  (computed on-the-fly — fix #11)
exports.getFacultyHours = async (req, res, next) => {
  try {
    const { date } = req.query; // optional: specific date
    const facultyId = req.params.id;

    // Count timetable slots per day for this faculty
    const timetables = await Timetable.find({ 'slots.faculty': facultyId });

    const dailyHours = {};
    timetables.forEach(tt => {
      tt.slots.forEach(slot => {
        if (slot.faculty && slot.faculty.toString() === facultyId && slot.type !== 'break') {
          dailyHours[slot.day] = (dailyHours[slot.day] || 0) + 1;
        }
      });
    });

    // Total weekly hours
    const weeklyTotal = Object.values(dailyHours).reduce((sum, h) => sum + h, 0);

    const faculty = await Faculty.findById(facultyId).select('maxHoursPerDay');

    res.json({
      success: true,
      data: {
        dailyHours,
        weeklyTotal,
        maxHoursPerDay: faculty?.maxHoursPerDay || 4,
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/faculty/:id/planner
exports.getPlanner = async (req, res, next) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ success: false, error: 'Faculty not found' });
    }

    // Get syllabus subjects assigned to this faculty
    const Syllabus = require('../models/Syllabus');
    const syllabi = await Syllabus.find({ 'subjects.faculty': req.params.id });

    const plan = [];
    syllabi.forEach(s => {
      s.subjects.forEach(sub => {
        if (sub.faculty && sub.faculty.toString() === req.params.id) {
          plan.push({
            subject: sub.name,
            code: sub.code,
            unitsDone: sub.unitsDone,
            totalUnits: sub.totalUnits,
            progress: sub.totalUnits ? Math.round((sub.unitsDone / sub.totalUnits) * 100) : 0,
            department: s.department,
            year: s.year,
            semester: s.semester,
          });
        }
      });
    });

    res.json({ success: true, data: plan });
  } catch (err) {
    next(err);
  }
};

// PUT /api/faculty/:id/planner
exports.updatePlanner = async (req, res, next) => {
  try {
    const { subjectCode, unitsDone } = req.body;
    if (!subjectCode || unitsDone === undefined) {
      return res.status(400).json({ success: false, error: 'subjectCode and unitsDone are required' });
    }

    const Syllabus = require('../models/Syllabus');
    const syllabus = await Syllabus.findOne({
      'subjects.faculty': req.params.id,
      'subjects.code': subjectCode,
    });
    if (!syllabus) {
      return res.status(404).json({ success: false, error: 'Subject not found in your planner' });
    }

    const subject = syllabus.subjects.find(
      s => s.code === subjectCode && s.faculty && s.faculty.toString() === req.params.id
    );
    if (subject) {
      subject.unitsDone = unitsDone;
      await syllabus.save();
    }

    res.json({ success: true, message: 'Planner updated' });
  } catch (err) {
    next(err);
  }
};
