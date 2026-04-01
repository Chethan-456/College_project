const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/message.controller');

// Specific routes BEFORE parameterized
router.get('/sent', auth, ctrl.getSent);

router.get('/',      auth, ctrl.getInbox);
router.get('/:id',   auth, ctrl.getMessage);
router.post('/',     auth, ctrl.sendMessage);
router.delete('/:id', auth, ctrl.deleteMessage);

module.exports = router;
