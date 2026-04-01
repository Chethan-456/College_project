const router = require('express').Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const ctrl = require('../controllers/fee.controller');

// Specific routes BEFORE parameterized
router.get('/pending',             auth, roles('principal'), ctrl.getPendingFees);
router.get('/student/:studentId',  auth, roles('principal', 'student'), ctrl.getStudentFees);

router.get('/',       auth, roles('principal'), ctrl.getFees);
router.post('/',      auth, roles('principal'), ctrl.createFee);
router.put('/:id/pay', auth, roles('principal'), ctrl.recordPayment);

module.exports = router;
