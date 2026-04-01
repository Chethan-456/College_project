const { body } = require('express-validator');

exports.createExamValidation = [
  body('title').notEmpty().trim().withMessage('Exam title is required'),
  body('subject').notEmpty().trim().withMessage('Subject is required'),
  body('department').optional().isMongoId().withMessage('Valid department ID required'),
  body('type').optional().isIn(['theory', 'practical', 'internal', 'external']).withMessage('Invalid exam type'),
  body('maxMarks').optional().isInt({ min: 0 }).withMessage('Max marks must be a positive number'),
  body('date').optional().isISO8601().withMessage('Valid date required'),
];

exports.uploadResultsValidation = [
  body('results').isArray({ min: 1 }).withMessage('Results must be a non-empty array'),
  body('results.*.student').isMongoId().withMessage('Each result needs a valid student ID'),
  body('results.*.marksObtained').isFloat({ min: 0 }).withMessage('Marks must be a positive number'),
];
