const router = require('express').Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const validate = require('../middleware/validate');
const { createTimetableValidation, slotValidation } = require('../validators/timetable.validator');
const ctrl = require('../controllers/timetable.controller');

// Specific routes BEFORE parameterized ones
router.get('/faculty/:facultyId', auth, ctrl.getFacultyTimetable);

router.get('/',                    auth, ctrl.getTimetables);
router.post('/',                   auth, roles('hod', 'principal'), createTimetableValidation, validate, ctrl.createTimetable);
router.put('/:id',                 auth, roles('hod', 'principal'), ctrl.updateTimetable);
router.put('/:id/slot',            auth, roles('hod', 'principal'), slotValidation, validate, ctrl.upsertSlot);
router.delete('/:id/slot/:slotId', auth, roles('hod', 'principal'), ctrl.deleteSlot);

module.exports = router;
