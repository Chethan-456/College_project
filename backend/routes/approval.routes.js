const router = require('express').Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const ctrl = require('../controllers/approval.controller');

// Specific routes BEFORE parameterized
router.get('/stats', auth, roles('principal'), ctrl.getApprovalStats);

router.get('/',               auth, ctrl.getApprovals);
router.get('/:id',            auth, ctrl.getApprovalById);
router.post('/',              auth, roles('hod', 'faculty'), ctrl.createApproval);
router.put('/:id/approve',    auth, roles('principal'), ctrl.approveRequest);
router.put('/:id/reject',     auth, roles('principal'), ctrl.rejectRequest);

module.exports = router;
