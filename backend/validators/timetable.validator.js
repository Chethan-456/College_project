const { body } = require('express-validator');

exports.createTimetableValidation = [
  body('department').isMongoId().withMessage('Valid department ID is required'),
  body('year').notEmpty().withMessage('Year is required'),
  body('semester').notEmpty().withMessage('Semester is required'),
  body('slots').optional().isArray().withMessage('Slots must be an array'),
];

exports.slotValidation = [
  body('day').isIn(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']).withMessage('Invalid day'),
  body('time').notEmpty().withMessage('Time slot is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('type').optional().isIn(['theory', 'practical', 'break']).withMessage('Invalid slot type'),
];
