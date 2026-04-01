const mongoose = require('mongoose');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const Department = require('../models/Department');
const Attendance = require('../models/Attendance');
const Exam = require('../models/Exam');
const Result = require('../models/Result');
const Syllabus = require('../models/Syllabus');
const Approval = require('../models/Approval');

// Helper: scope to dept for HOD
const deptFilter = (req) => {
  if (req.user.role === 'hod' && req.user.department) {
    return { department: req.user.department };
  }
  if (req.query.department) {
    return { department: req.query.department };
  }
  return {};
};

// GET /api/reports/dashboard  — principal KPIs
exports.getDashboard = async (req, res, next) => {
  try {
    const [totalStudents, totalFaculty, totalDepartments, pendingApprovals] = await Promise.all([
      Student.countDocuments({ status: 'active' }),
      Faculty.countDocuments(),
      Department.countDocuments({ isActive: true }),
      Approval.countDocuments({ status: 'pending' }),
    ]);

    // Active courses from syllabus
    const courseAgg = await Syllabus.aggregate([
      { $unwind: '$subjects' },
      { $group: { _id: null, count: { $sum: 1 } } },
    ]);

    // Average attendance
    const attAgg = await Attendance.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
        },
      },
    ]);

    const avgAttendance = attAgg.length
      ? Math.round((attAgg[0].present / attAgg[0].total) * 1000) / 10
      : 0;

    res.json({
      success: true,
      data: {
        totalStudents,
        totalFaculty,
        totalDepartments,
        activeCourses: courseAgg[0]?.count || 0,
        pendingApprovals,
        avgAttendance,
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/reports/faculty
exports.getFacultyReport = async (req, res, next) => {
  try {
    const filter = deptFilter(req);
    const faculty = await Faculty.find(filter)
      .populate('user', 'name email')
      .populate('department', 'name code');

    res.json({ success: true, data: faculty });
  } catch (err) {
    next(err);
  }
};

// GET /api/reports/academic
exports.getAcademicReport = async (req, res, next) => {
  try {
    const filter = deptFilter(req);
    const studentFilter = { status: 'active', ...filter };

    const students = await Student.find(studentFilter).select('year cgpa department');

    // Group by year
    const byYear = {};
    students.forEach(s => {
      if (!byYear[s.year]) byYear[s.year] = { count: 0, totalCgpa: 0 };
      byYear[s.year].count++;
      byYear[s.year].totalCgpa += s.cgpa || 0;
    });

    const report = Object.entries(byYear).map(([year, data]) => ({
      year,
      studentCount: data.count,
      avgCgpa: Math.round((data.totalCgpa / data.count) * 100) / 100,
    }));

    res.json({ success: true, data: report });
  } catch (err) {
    next(err);
  }
};

// GET /api/reports/attendance
exports.getAttendanceReport = async (req, res, next) => {
  try {
    const matchFilter = {};
    if (req.user.role === 'hod' && req.user.department) {
      matchFilter.department = mongoose.Types.ObjectId.createFromHexString(req.user.department);
    } else if (req.query.department) {
      matchFilter.department = mongoose.Types.ObjectId.createFromHexString(req.query.department);
    }

    const report = await Attendance.aggregate([
      { $match: matchFilter },
      {
        $group: {
          _id: '$department',
          total: { $sum: 1 },
          present: { $sum: { $cond: [{ $eq: ['$status', 'present'] }, 1, 0] } },
          absent: { $sum: { $cond: [{ $eq: ['$status', 'absent'] }, 1, 0] } },
        },
      },
      {
        $lookup: {
          from: 'departments',
          localField: '_id',
          foreignField: '_id',
          as: 'department',
        },
      },
      { $unwind: { path: '$department', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          departmentName: '$department.name',
          departmentCode: '$department.code',
          total: 1,
          present: 1,
          absent: 1,
          percentage: { $round: [{ $multiply: [{ $divide: ['$present', '$total'] }, 100] }, 1] },
        },
      },
    ]);

    res.json({ success: true, data: report });
  } catch (err) {
    next(err);
  }
};

// GET /api/reports/performance
exports.getPerformanceReport = async (req, res, next) => {
  try {
    const matchFilter = {};
    if (req.query.department) {
      matchFilter.department = mongoose.Types.ObjectId.createFromHexString(req.query.department);
    }

    // Get exam results with student info
    const results = await Result.find()
      .populate({
        path: 'student',
        populate: [
          { path: 'user', select: 'name' },
          { path: 'department', select: 'name code' },
        ],
      })
      .populate('exam', 'subject maxMarks department');

    // Filter by department if needed
    let filtered = results;
    if (req.query.department) {
      filtered = results.filter(r =>
        r.student && r.student.department && r.student.department._id.toString() === req.query.department
      );
    }

    // Aggregate
    const totalMarks = filtered.reduce((sum, r) => sum + (r.marksObtained || 0), 0);
    const avgMarks = filtered.length ? Math.round(totalMarks / filtered.length * 10) / 10 : 0;

    // Top 5 students by marks
    const studentMarks = {};
    filtered.forEach(r => {
      if (r.student && r.student.user) {
        const sid = r.student._id.toString();
        if (!studentMarks[sid]) {
          studentMarks[sid] = { name: r.student.user.name, totalMarks: 0, examCount: 0 };
        }
        studentMarks[sid].totalMarks += r.marksObtained || 0;
        studentMarks[sid].examCount++;
      }
    });

    const topStudents = Object.values(studentMarks)
      .sort((a, b) => b.totalMarks - a.totalMarks)
      .slice(0, 5);

    res.json({
      success: true,
      data: { avgMarks, totalResults: filtered.length, topStudents },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/reports/assessment
exports.getAssessmentReport = async (req, res, next) => {
  try {
    const matchFilter = {};
    if (req.query.department) {
      matchFilter.department = mongoose.Types.ObjectId.createFromHexString(req.query.department);
    }

    const exams = await Exam.find({ status: 'completed', ...matchFilter }).select('_id title subject maxMarks');

    const report = [];
    for (const exam of exams) {
      const resultCount = await Result.countDocuments({ exam: exam._id });
      report.push({
        examId: exam._id,
        title: exam.title,
        subject: exam.subject,
        maxMarks: exam.maxMarks,
        submissionCount: resultCount,
      });
    }

    res.json({ success: true, data: report });
  } catch (err) {
    next(err);
  }
};

// GET /api/reports/issues
exports.getIssuesReport = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.department) filter.department = req.query.department;

    const issues = await Approval.aggregate([
      { $match: filter },
      { $group: { _id: '$type', count: { $sum: 1 }, pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } } } },
      { $sort: { pending: -1 } },
    ]);

    res.json({ success: true, data: issues });
  } catch (err) {
    next(err);
  }
};
