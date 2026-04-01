const Approval = require('../models/Approval');

// GET /api/approvals
exports.getApprovals = async (req, res, next) => {
  try {
    const { status, type, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;

    // Non-principals only see their own requests
    if (!['principal'].includes(req.user.role)) {
      filter.requester = req.user.id;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [approvals, total] = await Promise.all([
      Approval.find(filter)
        .populate('requester', 'name role')
        .populate('department', 'name code')
        .populate('approvedBy', 'name')
        .skip(skip).limit(parseInt(limit))
        .sort({ createdAt: -1 }),
      Approval.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: approvals,
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/approvals/stats
exports.getApprovalStats = async (req, res, next) => {
  try {
    const stats = await Approval.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const formatted = { pending: 0, approved: 0, rejected: 0 };
    stats.forEach(s => { formatted[s._id] = s.count; });

    res.json({ success: true, data: formatted });
  } catch (err) {
    next(err);
  }
};

// GET /api/approvals/:id
exports.getApprovalById = async (req, res, next) => {
  try {
    const approval = await Approval.findById(req.params.id)
      .populate('requester', 'name role email')
      .populate('department', 'name code')
      .populate('approvedBy', 'name');
    if (!approval) {
      return res.status(404).json({ success: false, error: 'Approval not found' });
    }
    res.json({ success: true, data: approval });
  } catch (err) {
    next(err);
  }
};

// POST /api/approvals
exports.createApproval = async (req, res, next) => {
  try {
    const data = { ...req.body, requester: req.user.id };
    if (req.user.department) data.department = req.user.department;
    const approval = await Approval.create(data);
    res.status(201).json({ success: true, data: approval });
  } catch (err) {
    next(err);
  }
};

// PUT /api/approvals/:id/approve
exports.approveRequest = async (req, res, next) => {
  try {
    const approval = await Approval.findByIdAndUpdate(
      req.params.id,
      { status: 'approved', approvedBy: req.user.id, approvedAt: new Date() },
      { new: true }
    ).populate('requester', 'name');
    if (!approval) {
      return res.status(404).json({ success: false, error: 'Approval not found' });
    }
    res.json({ success: true, data: approval });
  } catch (err) {
    next(err);
  }
};

// PUT /api/approvals/:id/reject
exports.rejectRequest = async (req, res, next) => {
  try {
    const { rejectedReason } = req.body;
    const approval = await Approval.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected', approvedBy: req.user.id, rejectedReason },
      { new: true }
    ).populate('requester', 'name');
    if (!approval) {
      return res.status(404).json({ success: false, error: 'Approval not found' });
    }
    res.json({ success: true, data: approval });
  } catch (err) {
    next(err);
  }
};
