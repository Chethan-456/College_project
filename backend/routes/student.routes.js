const router = require('express').Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const deptScope = require('../middleware/deptScope');
const validate = require('../middleware/validate');
const { createStudentValidation, updateStudentValidation } = require('../validators/student.validator');
const ctrl = require('../controllers/student.controller');

router.get('/',       auth, roles('principal', 'hod', 'faculty'), deptScope, ctrl.getStudents);
router.get('/:id',    auth, ctrl.getStudentById);
router.post('/',      auth, roles('principal'), createStudentValidation, validate, ctrl.createStudent);
router.put('/:id',    auth, roles('principal', 'hod', 'student'), updateStudentValidation, validate, ctrl.updateStudent);
router.delete('/:id', auth, roles('principal'), ctrl.deleteStudent);

module.exports = router;
