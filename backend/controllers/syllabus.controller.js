const Syllabus = require('../models/Syllabus');

// GET /api/syllabus
exports.getSyllabus = async (req, res, next) => {
  try {
    const { department, year, semester, academicYear } = req.query;
    const filter = {};
    if (department) filter.department = department;
    if (year) filter.year = year;
    if (semester) filter.semester = semester;
    if (academicYear) filter.academicYear = academicYear;

    const syllabi = await Syllabus.find(filter)
      .populate('department', 'name code')
      .populate('subjects.faculty', 'user')
      .sort({ year: 1, semester: 1 });

    // Deep populate faculty user names
    await Syllabus.populate(syllabi, {
      path: 'subjects.faculty',
      populate: { path: 'user', select: 'name' },
    });

    res.json({ success: true, data: syllabi });
  } catch (err) {
    next(err);
  }
};

// POST /api/syllabus
exports.createSyllabus = async (req, res, next) => {
  try {
    const syllabus = await Syllabus.create(req.body);
    res.status(201).json({ success: true, data: syllabus });
  } catch (err) {
    next(err);
  }
};

// PUT /api/syllabus/:id
exports.updateSyllabus = async (req, res, next) => {
  try {
    const syllabus = await Syllabus.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!syllabus) {
      return res.status(404).json({ success: false, error: 'Syllabus not found' });
    }
    res.json({ success: true, data: syllabus });
  } catch (err) {
    next(err);
  }
};

// PUT /api/syllabus/:id/progress  — faculty updates units done
exports.updateProgress = async (req, res, next) => {
  try {
    const { subjectCode, unitsDone } = req.body;
    if (!subjectCode || unitsDone === undefined) {
      return res.status(400).json({ success: false, error: 'subjectCode and unitsDone are required' });
    }

    const syllabus = await Syllabus.findById(req.params.id);
    if (!syllabus) {
      return res.status(404).json({ success: false, error: 'Syllabus not found' });
    }

    const subject = syllabus.subjects.find(s => s.code === subjectCode);
    if (!subject) {
      return res.status(404).json({ success: false, error: 'Subject not found in syllabus' });
    }

    subject.unitsDone = unitsDone;
    await syllabus.save();

    res.json({ success: true, data: syllabus });
  } catch (err) {
    next(err);
  }
};
