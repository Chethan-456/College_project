const router = require('express').Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const ctrl = require('../controllers/hod.controller');

router.get('/dashboard',          auth, roles('hod'), ctrl.getDashboard);
router.get('/faculty-load',       auth, roles('hod'), ctrl.getFacultyLoad);
router.get('/classes',            auth, roles('hod'), ctrl.getClasses);
router.get('/assignments',        auth, roles('hod'), ctrl.getAssignments);
router.get('/grade-distribution', auth, roles('hod'), ctrl.getGradeDistribution);

module.exports = router;
