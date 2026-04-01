const Fee = require('../models/Fee');
const Student = require('../models/Student');

// GET /api/fees
exports.getFees = async (req, res, next) => {
  try {
    const { status, academicYear, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (academicYear) filter.academicYear = academicYear;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [fees, total] = await Promise.all([
      Fee.find(filter)
        .populate({ path: 'student', populate: { path: 'user', select: 'name email' } })
        .skip(skip).limit(parseInt(limit))
        .sort({ createdAt: -1 }),
      Fee.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: fees,
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/fees/pending
exports.getPendingFees = async (req, res, next) => {
  try {
    const fees = await Fee.find({ status: { $in: ['pending', 'partial'] } })
      .populate({ path: 'student', populate: { path: 'user', select: 'name email' } })
      .sort({ dueDate: 1 });

    res.json({ success: true, data: fees });
  } catch (err) {
    next(err);
  }
};

// GET /api/fees/student/:studentId
exports.getStudentFees = async (req, res, next) => {
  try {
    // Self-access check for students
    if (req.user.role === 'student') {
      const student = await Student.findById(req.params.studentId);
      if (!student || student.user.toString() !== req.user.id) {
        return res.status(403).json({ success: false, error: 'Access denied' });
      }
    }

    const fees = await Fee.find({ student: req.params.studentId })
      .sort({ createdAt: -1 });

    res.json({ success: true, data: fees });
  } catch (err) {
    next(err);
  }
};

// POST /api/fees
exports.createFee = async (req, res, next) => {
  try {
    const fee = await Fee.create(req.body);
    res.status(201).json({ success: true, data: fee });
  } catch (err) {
    next(err);
  }
};

// PUT /api/fees/:id/pay  — record a payment
exports.recordPayment = async (req, res, next) => {
  try {
    const { amount, method, receipt } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, error: 'Valid payment amount is required' });
    }

    const fee = await Fee.findById(req.params.id);
    if (!fee) {
      return res.status(404).json({ success: false, error: 'Fee record not found' });
    }

    fee.payments.push({ amount, method, receipt, paidOn: new Date() });
    fee.paidAmount += amount;
    // Status auto-updates via pre-save hook
    await fee.save();

    res.json({ success: true, data: fee });
  } catch (err) {
    next(err);
  }
};
