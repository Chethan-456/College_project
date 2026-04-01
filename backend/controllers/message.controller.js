const Message = require('../models/Message');
const User = require('../models/User');

// Helper: build inbox query for a user
const buildInboxQuery = (user) => {
  const conditions = [
    { to: user.id, deletedBy: { $ne: user.id } },
  ];

  // Role-based broadcast messages
  const roleMap = { principal: 'all', hod: 'hods', faculty: 'faculty', student: 'students' };
  const roleTarget = roleMap[user.role];
  if (roleTarget) {
    const broadcastFilter = {
      $or: [{ toRole: roleTarget }, { toRole: 'all' }],
      deletedBy: { $ne: user.id },
    };
    if (user.department) {
      conditions.push({ ...broadcastFilter, toDept: user.department });
      conditions.push({ ...broadcastFilter, toDept: { $exists: false } });
      conditions.push({ ...broadcastFilter, toDept: null });
    } else {
      conditions.push(broadcastFilter);
    }
  }

  return { $or: conditions };
};

// GET /api/messages  — inbox
exports.getInbox = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const query = buildInboxQuery(req.user);
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [messages, total] = await Promise.all([
      Message.find(query)
        .populate('from', 'name role')
        .populate('to', 'name role')
        .skip(skip).limit(parseInt(limit))
        .sort({ createdAt: -1 }),
      Message.countDocuments(query),
    ]);

    // Add isRead flag for this user
    const data = messages.map(m => ({
      ...m.toObject(),
      isRead: m.readBy.some(r => r.user && r.user.toString() === req.user.id),
    }));

    res.json({
      success: true,
      data,
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/messages/sent
exports.getSent = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [messages, total] = await Promise.all([
      Message.find({ from: req.user.id })
        .populate('to', 'name role')
        .skip(skip).limit(parseInt(limit))
        .sort({ createdAt: -1 }),
      Message.countDocuments({ from: req.user.id }),
    ]);

    res.json({
      success: true,
      data: messages,
      pagination: { page: parseInt(page), limit: parseInt(limit), total },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/messages/:id  — marks as read
exports.getMessage = async (req, res, next) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate('from', 'name role email')
      .populate('to', 'name role email');

    if (!message) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }

    // Mark as read for this user (if not already)
    const alreadyRead = message.readBy.some(r => r.user && r.user.toString() === req.user.id);
    if (!alreadyRead) {
      message.readBy.push({ user: req.user.id, readAt: new Date() });
      await message.save();
    }

    res.json({ success: true, data: message });
  } catch (err) {
    next(err);
  }
};

// POST /api/messages  — send
exports.sendMessage = async (req, res, next) => {
  try {
    const data = { ...req.body, from: req.user.id };
    const message = await Message.create(data);
    res.status(201).json({ success: true, data: message });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/messages/:id  — soft delete for this user
exports.deleteMessage = async (req, res, next) => {
  try {
    await Message.findByIdAndUpdate(req.params.id, {
      $addToSet: { deletedBy: req.user.id },
    });
    res.json({ success: true, message: 'Message removed from inbox' });
  } catch (err) {
    next(err);
  }
};
