const LeaveRequest = require('../models/LeaveRequest');
const Faculty = require('../models/Faculty');

// POST /api/leaves  — faculty submits leave
exports.createLeave = async (req, res, next) => {
  try {
    // Find the faculty profile for the logged-in user
    const faculty = await Faculty.findOne({ user: req.user.id });
    if (!faculty) {
      return res.status(404).json({ success: false, error: 'Faculty profile not found' });
    }

    const leave = await LeaveRequest.create({
      faculty: faculty._id,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
      reason: req.body.reason,
    });

    res.status(201).json({ success: true, data: leave });
  } catch (err) {
    next(err);
  }
};

// GET /api/leaves  — list leaves (HOD sees own dept, principal sees all)
exports.getLeaves = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    // For HOD, only show leaves from their department
    if (req.user.role === 'hod') {
      const deptFaculty = await Faculty.find({ department: req.user.department }).select('_id');
      filter.faculty = { $in: deptFaculty.map(f => f._id) };
    }

    // For faculty, only show their own
    if (req.user.role === 'faculty') {
      const faculty = await Faculty.findOne({ user: req.user.id });
      if (faculty) filter.faculty = faculty._id;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [leaves, total] = await Promise.all([
      LeaveRequest.find(filter)
        .populate({ path: 'faculty', populate: { path: 'user', select: 'name email' } })
        .populate('approvedBy', 'name')
        .skip(skip).limit(parseInt(limit))
        .sort({ createdAt: -1 }),
      LeaveRequest.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: leaves,
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
    });
  } catch (err) {
    next(err);
  }
};

// PUT /api/leaves/:id  — approve or reject
exports.updateLeave = async (req, res, next) => {
  try {
    const { status, rejectedReason } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Status must be approved or rejected' });
    }

    const update = { status, approvedBy: req.user.id };
    if (status === 'rejected' && rejectedReason) {
      update.rejectedReason = rejectedReason;
    }

    const leave = await LeaveRequest.findByIdAndUpdate(req.params.id, update, { new: true })
      .populate({ path: 'faculty', populate: { path: 'user', select: 'name email' } })
      .populate('approvedBy', 'name');

    if (!leave) {
      return res.status(404).json({ success: false, error: 'Leave request not found' });
    }

    res.json({ success: true, data: leave });
  } catch (err) {
    next(err);
  }
};
