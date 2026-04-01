const router = require('express').Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const ctrl = require('../controllers/leave.controller');

router.post('/',    auth, roles('faculty'), ctrl.createLeave);
router.get('/',     auth, roles('faculty', 'hod', 'principal'), ctrl.getLeaves);
router.put('/:id',  auth, roles('hod', 'principal'), ctrl.updateLeave);

module.exports = router;
