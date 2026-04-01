const router = require('express').Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const validate = require('../middleware/validate');
const { createExamValidation, uploadResultsValidation } = require('../validators/exam.validator');
const ctrl = require('../controllers/exam.controller');

// Specific routes BEFORE parameterized
router.get('/student/:studentId/results', auth, ctrl.getStudentResults);

router.get('/',             auth, ctrl.getExams);
router.get('/:id',          auth, ctrl.getExamById);
router.post('/',            auth, roles('hod', 'principal', 'faculty'), createExamValidation, validate, ctrl.createExam);
router.put('/:id',          auth, roles('hod', 'principal'), ctrl.updateExam);
router.delete('/:id',       auth, roles('principal'), ctrl.deleteExam);
router.post('/:id/results', auth, roles('faculty', 'hod'), uploadResultsValidation, validate, ctrl.uploadResults);
router.get('/:id/results',  auth, ctrl.getExamResults);

module.exports = router;
