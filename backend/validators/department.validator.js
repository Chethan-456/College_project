const { body } = require('express-validator');

exports.createDepartmentValidation = [
  body('name').notEmpty().trim().withMessage('Department name is required'),
  body('code').notEmpty().trim().withMessage('Department code is required'),
  body('description').optional().trim(),
  body('hod').optional().isMongoId().withMessage('Valid HOD user ID required'),
];

exports.updateDepartmentValidation = [
  body('name').optional().notEmpty().trim().withMessage('Name cannot be empty'),
  body('code').optional().notEmpty().trim().withMessage('Code cannot be empty'),
  body('description').optional().trim(),
  body('hod').optional().isMongoId().withMessage('Valid HOD user ID required'),
];
