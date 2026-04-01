const router = require('express').Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const ctrl = require('../controllers/committee.controller');

router.get('/',              auth, ctrl.getCommittees);
router.get('/:id',           auth, ctrl.getCommitteeById);
router.post('/',             auth, roles('principal'), ctrl.createCommittee);
router.put('/:id',           auth, roles('principal'), ctrl.updateCommittee);
router.put('/:id/members',   auth, roles('principal'), ctrl.updateMembers);
router.delete('/:id',        auth, roles('principal'), ctrl.deleteCommittee);

module.exports = router;
