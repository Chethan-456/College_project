const router = require('express').Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const validate = require('../middleware/validate');
const { markAttendanceValidation, bulkAttendanceValidation } = require('../validators/attendance.validator');
const ctrl = require('../controllers/attendance.controller');

// Specific routes BEFORE parameterized
router.post('/bulk',                    auth, roles('faculty'), bulkAttendanceValidation, validate, ctrl.bulkMarkAttendance);
router.get('/summary/:studentId',       auth, ctrl.getAttendanceSummary);
router.get('/department/:deptId',       auth, roles('hod', 'principal'), ctrl.getDeptAttendance);
router.get('/student/:studentId',       auth, ctrl.getStudentAttendance);

router.post('/',   auth, roles('faculty'), markAttendanceValidation, validate, ctrl.markAttendance);
router.put('/:id', auth, roles('faculty'), ctrl.updateAttendance);

module.exports = router;
