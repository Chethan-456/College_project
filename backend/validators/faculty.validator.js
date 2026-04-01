const { body } = require('express-validator');

exports.createFacultyValidation = [
  body('user').isMongoId().withMessage('Valid user ID is required'),
  body('department').isMongoId().withMessage('Valid department ID is required'),
  body('designation').optional().isIn(['Assistant Professor', 'Associate Professor', 'Professor', 'HOD']).withMessage('Invalid designation'),
  body('qualification').optional().trim(),
  body('specialization').optional().trim(),
  body('experience').optional().isInt({ min: 0 }).withMessage('Experience must be a positive number'),
  body('phone').optional().trim(),
];

exports.updateFacultyValidation = [
  body('designation').optional().isIn(['Assistant Professor', 'Associate Professor', 'Professor', 'HOD']).withMessage('Invalid designation'),
  body('qualification').optional().trim(),
  body('specialization').optional().trim(),
  body('experience').optional().isInt({ min: 0 }).withMessage('Experience must be a positive number'),
  body('phone').optional().trim(),
  body('subjectsTaught').optional().isArray().withMessage('subjectsTaught must be an array'),
  body('maxHoursPerDay').optional().isInt({ min: 1, max: 12 }).withMessage('Max hours must be between 1 and 12'),
];
