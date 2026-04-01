const Committee = require('../models/Committee');

// GET /api/committees
exports.getCommittees = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;

    const committees = await Committee.find(filter)
      .populate('convenor', 'name email')
      .populate('members', 'name role')
      .populate('department', 'name code')
      .sort({ name: 1 });

    res.json({ success: true, data: committees });
  } catch (err) {
    next(err);
  }
};

// GET /api/committees/:id
exports.getCommitteeById = async (req, res, next) => {
  try {
    const committee = await Committee.findById(req.params.id)
      .populate('convenor', 'name email')
      .populate('members', 'name role email')
      .populate('department', 'name code');
    if (!committee) {
      return res.status(404).json({ success: false, error: 'Committee not found' });
    }
    res.json({ success: true, data: committee });
  } catch (err) {
    next(err);
  }
};

// POST /api/committees
exports.createCommittee = async (req, res, next) => {
  try {
    const committee = await Committee.create(req.body);
    res.status(201).json({ success: true, data: committee });
  } catch (err) {
    next(err);
  }
};

// PUT /api/committees/:id
exports.updateCommittee = async (req, res, next) => {
  try {
    const committee = await Committee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!committee) {
      return res.status(404).json({ success: false, error: 'Committee not found' });
    }
    res.json({ success: true, data: committee });
  } catch (err) {
    next(err);
  }
};

// PUT /api/committees/:id/members  — add/remove members
exports.updateMembers = async (req, res, next) => {
  try {
    const { add, remove } = req.body; // { add: [userId], remove: [userId] }

    const updates = {};
    if (add && add.length) {
      updates.$addToSet = { members: { $each: add } };
    }
    if (remove && remove.length) {
      updates.$pull = { members: { $in: remove } };
    }

    // Can't use both $addToSet and $pull in one update, do sequentially
    if (add && add.length) {
      await Committee.findByIdAndUpdate(req.params.id, { $addToSet: { members: { $each: add } } });
    }
    if (remove && remove.length) {
      await Committee.findByIdAndUpdate(req.params.id, { $pull: { members: { $in: remove } } });
    }

    const committee = await Committee.findById(req.params.id)
      .populate('members', 'name role');
    res.json({ success: true, data: committee });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/committees/:id  (soft delete)
exports.deleteCommittee = async (req, res, next) => {
  try {
    const committee = await Committee.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!committee) {
      return res.status(404).json({ success: false, error: 'Committee not found' });
    }
    res.json({ success: true, message: 'Committee deactivated' });
  } catch (err) {
    next(err);
  }
};
