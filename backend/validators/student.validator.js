const { body } = require('express-validator');

exports.createStudentValidation = [
  body('user').isMongoId().withMessage('Valid user ID is required'),
  body('rollNumber').notEmpty().trim().withMessage('Roll number is required'),
  body('department').isMongoId().withMessage('Valid department ID is required'),
  body('year').isIn(['1st Year', '2nd Year', '3rd Year']).withMessage('Invalid year'),
  body('semester').optional().trim(),
  body('gender').optional().isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
  body('phone').optional().trim(),
];

exports.updateStudentValidation = [
  body('year').optional().isIn(['1st Year', '2nd Year', '3rd Year']).withMessage('Invalid year'),
  body('semester').optional().trim(),
  body('gender').optional().isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
  body('status').optional().isIn(['active', 'inactive', 'graduated']).withMessage('Invalid status'),
  body('cgpa').optional().isFloat({ min: 0, max: 10 }).withMessage('CGPA must be between 0 and 10'),
];
