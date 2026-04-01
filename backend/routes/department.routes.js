const router = require('express').Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const validate = require('../middleware/validate');
const { createDepartmentValidation, updateDepartmentValidation } = require('../validators/department.validator');
const ctrl = require('../controllers/department.controller');

router.get('/',          auth, ctrl.getDepartments);
router.get('/:id',       auth, ctrl.getDepartment);
router.get('/:id/stats', auth, ctrl.getDepartmentStats);
router.post('/',         auth, roles('principal'), createDepartmentValidation, validate, ctrl.createDepartment);
router.put('/:id',       auth, roles('principal'), updateDepartmentValidation, validate, ctrl.updateDepartment);
router.delete('/:id',   auth, roles('principal'), ctrl.deleteDepartment);

module.exports = router;
