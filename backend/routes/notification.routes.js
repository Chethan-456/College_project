const router = require('express').Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const ctrl = require('../controllers/notification.controller');

// Specific routes BEFORE parameterized
router.get('/unread-count',   auth, ctrl.getUnreadCount);
router.put('/read-all',       auth, ctrl.markAllAsRead);

router.get('/',               auth, ctrl.getNotifications);
router.post('/',              auth, roles('principal', 'hod', 'faculty'), ctrl.createNotification);
router.put('/:id/read',       auth, ctrl.markAsRead);
router.delete('/:id',         auth, ctrl.dismissNotification);

module.exports = router;
