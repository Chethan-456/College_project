const router = require('express').Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const deptScope = require('../middleware/deptScope');
const validate = require('../middleware/validate');
const { createFacultyValidation, updateFacultyValidation } = require('../validators/faculty.validator');
const ctrl = require('../controllers/faculty.controller');

router.get('/',               auth, roles('principal', 'hod'), deptScope, ctrl.getFaculty);
router.get('/:id',            auth, ctrl.getFacultyById);
router.post('/',              auth, roles('principal'), createFacultyValidation, validate, ctrl.createFaculty);
router.put('/:id',            auth, roles('principal', 'hod', 'faculty'), updateFacultyValidation, validate, ctrl.updateFaculty);
router.delete('/:id',         auth, roles('principal'), ctrl.deleteFaculty);
router.get('/:id/timetable',  auth, ctrl.getFacultyTimetable);
router.get('/:id/hours',      auth, roles('faculty', 'hod', 'principal'), ctrl.getFacultyHours);
router.get('/:id/planner',    auth, roles('faculty'), ctrl.getPlanner);
router.put('/:id/planner',    auth, roles('faculty'), ctrl.updatePlanner);

module.exports = router;
