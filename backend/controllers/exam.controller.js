const Exam = require('../models/Exam');
const Result = require('../models/Result');

// GET /api/exams
exports.getExams = async (req, res, next) => {
  try {
    const { department, semester, status, year, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (department) filter.department = department;
    if (semester) filter.semester = semester;
    if (status) filter.status = status;
    if (year) filter.year = year;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [exams, total] = await Promise.all([
      Exam.find(filter)
        .populate('department', 'name code')
        .skip(skip).limit(parseInt(limit))
        .sort({ date: -1 }),
      Exam.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: exams,
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/exams/:id
exports.getExamById = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id).populate('department', 'name code');
    if (!exam) {
      return res.status(404).json({ success: false, error: 'Exam not found' });
    }
    res.json({ success: true, data: exam });
  } catch (err) {
    next(err);
  }
};

// POST /api/exams
exports.createExam = async (req, res, next) => {
  try {
    const exam = await Exam.create(req.body);
    res.status(201).json({ success: true, data: exam });
  } catch (err) {
    next(err);
  }
};

// PUT /api/exams/:id
exports.updateExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!exam) {
      return res.status(404).json({ success: false, error: 'Exam not found' });
    }
    res.json({ success: true, data: exam });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/exams/:id  (cancel)
exports.deleteExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
    if (!exam) {
      return res.status(404).json({ success: false, error: 'Exam not found' });
    }
    res.json({ success: true, message: 'Exam cancelled' });
  } catch (err) {
    next(err);
  }
};

// POST /api/exams/:id/results  — upload results (separate Result model — fix #10)
exports.uploadResults = async (req, res, next) => {
  try {
    const examId = req.params.id;
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ success: false, error: 'Exam not found' });
    }

    const { results } = req.body; // [{ student, marksObtained, grade, remarks }]

    const docs = results.map(r => ({
      exam: examId,
      student: r.student,
      marksObtained: r.marksObtained,
      grade: r.grade || '',
      remarks: r.remarks || '',
    }));

    // Upsert: update if exists, create if not
    const bulkOps = docs.map(d => ({
      updateOne: {
        filter: { exam: d.exam, student: d.student },
        update: { $set: d },
        upsert: true,
      },
    }));

    await Result.bulkWrite(bulkOps);

    // Mark exam as completed
    exam.status = 'completed';
    await exam.save();

    res.status(201).json({ success: true, message: `${docs.length} results uploaded` });
  } catch (err) {
    next(err);
  }
};

// GET /api/exams/:id/results
exports.getExamResults = async (req, res, next) => {
  try {
    const results = await Result.find({ exam: req.params.id })
      .populate({ path: 'student', populate: { path: 'user', select: 'name' } })
      .sort({ marksObtained: -1 });

    res.json({ success: true, data: results });
  } catch (err) {
    next(err);
  }
};

// GET /api/exams/student/:studentId/results
exports.getStudentResults = async (req, res, next) => {
  try {
    const results = await Result.find({ student: req.params.studentId })
      .populate('exam')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: results });
  } catch (err) {
    next(err);
  }
};
