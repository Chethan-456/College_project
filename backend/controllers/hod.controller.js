const mongoose = require('mongoose');
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');
const LeaveRequest = require('../models/LeaveRequest');
const Attendance = require('../models/Attendance');
const Timetable = require('../models/Timetable');
const Result = require('../models/Result');
const Exam = require('../models/Exam');

// GET /api/hod/dashboard
exports.getDashboard = async (req, res, next) => {
  try {
    const deptId = req.user.department;

    const [totalStudents, totalFaculty, pendingLeaves] = await Promise.all([
      Student.countDocuments({ department: deptId, status: 'active' }),
      Faculty.countDocuments({ department: deptId }),
      (async () => {
        const deptFaculty = await Faculty.find({ department: deptId }).select('_id');
        return LeaveRequest.countDocuments({
          faculty: { $in: deptFaculty.map(f => f._id) },
          status: 'pending',
        });
      })(),
    ]);

    res.json({
      success: true,
      data: { totalStudents, totalFaculty, pendingLeaves },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/hod/faculty-load
exports.getFacultyLoad = async (req, res, next) => {
  try {
    const deptId = req.user.department;
    const faculty = await Faculty.find({ department: deptId })
      .populate('user', 'name email')
      .select('user maxHoursPerDay');

    const timetables = await Timetable.find({ department: deptId });

    const result = faculty.map(f => {
      let dailySlots = {};
      timetables.forEach(tt => {
        tt.slots.forEach(slot => {
          if (slot.faculty && slot.faculty.toString() === f._id.toString() && slot.type !== 'break') {
            dailySlots[slot.day] = (dailySlots[slot.day] || 0) + 1;
          }
        });
      });

      const totalWeekly = Object.values(dailySlots).reduce((s, h) => s + h, 0);

      return {
        facultyId: f._id,
        name: f.user?.name,
        maxHoursPerDay: f.maxHoursPerDay,
        dailySlots,
        totalWeekly,
      };
    });

    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

// GET /api/hod/classes
exports.getClasses = async (req, res, next) => {
  try {
    const deptId = req.user.department;

    const students = await Student.find({ department: deptId, status: 'active' }).select('year');
    const yearCounts = {};
    students.forEach(s => {
      yearCounts[s.year] = (yearCounts[s.year] || 0) + 1;
    });

    // Attendance summary per year
    const deptObjId = mongoose.Types.ObjectId.createFromHexString(deptId);
    const attSummary = await Attendance.aggregate([
      { $match: { department: deptObjId } },
      {
        $lookup: {
          from: 'students',
          localField: 'student',
          foreignField: '_id',
          as: 'studentInfo',
        },
      },
      { $unwind: '$studentInfo' },
      {
        $group: {
          _id: '$studentInfo.year',
          total: { $sum: 1 },
          present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
        },
      },
      {
        $addFields: {
          percentage: { $round: [{ $multiply: [{ $divide: ['$present', '$total'] }, 100] }, 1] },
        },
      },
    ]);

    const classes = Object.entries(yearCounts).map(([year, count]) => {
      const att = attSummary.find(a => a._id === year);
      return {
        year,
        studentCount: count,
        attendancePercentage: att?.percentage || 0,
      };
    });

    res.json({ success: true, data: classes });
  } catch (err) {
    next(err);
  }
};

// GET /api/hod/assignments
exports.getAssignments = async (req, res, next) => {
  try {
    const deptId = req.user.department;
    const exams = await Exam.find({ department: deptId, status: 'completed' }).select('_id title subject maxMarks');

    const report = [];
    for (const exam of exams) {
      const resultCount = await Result.countDocuments({ exam: exam._id });
      const totalStudents = await Student.countDocuments({ department: deptId, status: 'active' });
      report.push({
        title: exam.title,
        subject: exam.subject,
        submissions: resultCount,
        totalStudents,
        rate: totalStudents ? Math.round((resultCount / totalStudents) * 100) : 0,
      });
    }

    res.json({ success: true, data: report });
  } catch (err) {
    next(err);
  }
};

// GET /api/hod/grade-distribution
exports.getGradeDistribution = async (req, res, next) => {
  try {
    const deptId = req.user.department;
    const deptStudents = await Student.find({ department: deptId }).select('_id');
    const studentIds = deptStudents.map(s => s._id);

    const distribution = await Result.aggregate([
      { $match: { student: { $in: studentIds } } },
      { $group: { _id: '$grade', count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.json({ success: true, data: distribution });
  } catch (err) {
    next(err);
  }
};
