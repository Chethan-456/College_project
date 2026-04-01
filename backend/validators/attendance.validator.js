const { body } = require('express-validator');

exports.markAttendanceValidation = [
  body('student').isMongoId().withMessage('Valid student ID is required'),
  body('subject').notEmpty().trim().withMessage('Subject is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('status').isIn(['present', 'absent', 'late']).withMessage('Status must be present, absent, or late'),
];

exports.bulkAttendanceValidation = [
  body('subject').notEmpty().trim().withMessage('Subject is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('records').isArray({ min: 1 }).withMessage('Records must be a non-empty array'),
  body('records.*.student').isMongoId().withMessage('Each record needs a valid student ID'),
  body('records.*.status').isIn(['present', 'absent', 'late']).withMessage('Each record needs a valid status'),
];
