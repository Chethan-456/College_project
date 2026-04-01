const { body } = require('express-validator');

exports.createUserValidation = [
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['principal', 'hod', 'faculty', 'student']).withMessage('Invalid role'),
  body('department').optional().isMongoId().withMessage('Valid department ID required'),
];

exports.updateUserValidation = [
  body('name').optional().notEmpty().trim().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('role').optional().isIn(['principal', 'hod', 'faculty', 'student']).withMessage('Invalid role'),
  body('department').optional().isMongoId().withMessage('Valid department ID required'),
];
