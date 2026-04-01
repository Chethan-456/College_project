const { body } = require('express-validator');

exports.loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

exports.registerFacultyValidation = [
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('department').isMongoId().withMessage('Valid department ID is required'),
  body('designation').optional().isIn(['Assistant Professor', 'Associate Professor', 'Professor', 'HOD']).withMessage('Invalid designation'),
  body('qualification').optional().trim(),
  body('phone').optional().trim(),
];

exports.changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
];
