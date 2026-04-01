const Notification = require('../models/Notification');

// GET /api/notifications  — for logged-in user (fix #8: proper $or query)
exports.getNotifications = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    const userDept = req.user.department;

    const notifications = await Notification.find({
      $or: [
        { recipients: userId },
        { targetRoles: userRole, targetDept: userDept },
        { targetRoles: userRole, targetDept: { $exists: false } },
        { targetRoles: userRole, targetDept: null },
      ],
    })
      .populate('createdBy', 'name role')
      .sort({ createdAt: -1 });

    // Mark which ones are read by this user
    const data = notifications.map(n => ({
      ...n.toObject(),
      isRead: n.readBy.some(id => id.toString() === userId),
    }));

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// GET /api/notifications/unread-count
exports.getUnreadCount = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    const userDept = req.user.department;

    const notifications = await Notification.find({
      $or: [
        { recipients: userId },
        { targetRoles: userRole, targetDept: userDept },
        { targetRoles: userRole, targetDept: { $exists: false } },
        { targetRoles: userRole, targetDept: null },
      ],
      readBy: { $ne: userId },
    });

    res.json({ success: true, data: { count: notifications.length } });
  } catch (err) {
    next(err);
  }
};

// POST /api/notifications
exports.createNotification = async (req, res, next) => {
  try {
    const data = { ...req.body, createdBy: req.user.id };
    const notification = await Notification.create(data);
    res.status(201).json({ success: true, data: notification });
  } catch (err) {
    next(err);
  }
};

// PUT /api/notifications/:id/read
exports.markAsRead = async (req, res, next) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      $addToSet: { readBy: req.user.id },
    });
    res.json({ success: true, message: 'Marked as read' });
  } catch (err) {
    next(err);
  }
};

// PUT /api/notifications/read-all
exports.markAllAsRead = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    const userDept = req.user.department;

    await Notification.updateMany(
      {
        $or: [
          { recipients: userId },
          { targetRoles: userRole, targetDept: userDept },
          { targetRoles: userRole, targetDept: { $exists: false } },
          { targetRoles: userRole, targetDept: null },
        ],
        readBy: { $ne: userId },
      },
      { $addToSet: { readBy: userId } }
    );

    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/notifications/:id
exports.dismissNotification = async (req, res, next) => {
  try {
    // Remove user from recipients (dismiss for this user only)
    await Notification.findByIdAndUpdate(req.params.id, {
      $pull: { recipients: req.user.id },
      $addToSet: { readBy: req.user.id },
    });
    res.json({ success: true, message: 'Notification dismissed' });
  } catch (err) {
    next(err);
  }
};
