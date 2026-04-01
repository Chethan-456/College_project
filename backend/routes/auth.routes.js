const router = require('express').Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { loginValidation, registerFacultyValidation, changePasswordValidation } = require('../validators/auth.validator');
const { login, registerFaculty, getMe, changePassword } = require('../controllers/auth.controller');

router.post('/login', loginValidation, validate, login);
router.post('/register-faculty', registerFacultyValidation, validate, registerFaculty);
router.get('/me', auth, getMe);
router.put('/change-password', auth, changePasswordValidation, validate, changePassword);

module.exports = router;
