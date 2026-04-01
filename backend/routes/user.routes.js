const router = require('express').Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const validate = require('../middleware/validate');
const { createUserValidation, updateUserValidation } = require('../validators/user.validator');
const ctrl = require('../controllers/user.controller');

router.get('/',    auth, roles('principal'), ctrl.getUsers);
router.post('/',   auth, roles('principal'), createUserValidation, validate, ctrl.createUser);
router.get('/:id', auth, roles('principal', 'hod'), ctrl.getUser);
router.put('/:id', auth, roles('principal'), updateUserValidation, validate, ctrl.updateUser);
router.delete('/:id', auth, roles('principal'), ctrl.deleteUser);

module.exports = router;
