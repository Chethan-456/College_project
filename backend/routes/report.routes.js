const router = require('express').Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const ctrl = require('../controllers/report.controller');

router.get('/dashboard',   auth, roles('principal'), ctrl.getDashboard);
router.get('/faculty',     auth, roles('principal', 'hod'), ctrl.getFacultyReport);
router.get('/academic',    auth, roles('principal', 'hod'), ctrl.getAcademicReport);
router.get('/attendance',  auth, roles('principal', 'hod'), ctrl.getAttendanceReport);
router.get('/performance', auth, roles('principal', 'hod'), ctrl.getPerformanceReport);
router.get('/assessment',  auth, roles('principal', 'hod'), ctrl.getAssessmentReport);
router.get('/issues',      auth, roles('principal', 'hod'), ctrl.getIssuesReport);

module.exports = router;
