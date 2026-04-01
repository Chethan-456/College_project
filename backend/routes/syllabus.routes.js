const router = require('express').Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const ctrl = require('../controllers/syllabus.controller');

router.get('/',              auth, ctrl.getSyllabus);
router.post('/',             auth, roles('hod', 'principal'), ctrl.createSyllabus);
router.put('/:id',           auth, roles('hod', 'principal'), ctrl.updateSyllabus);
router.put('/:id/progress',  auth, roles('faculty'), ctrl.updateProgress);

module.exports = router;
