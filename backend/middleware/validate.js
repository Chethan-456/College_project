const { validationResult } = require('express-validator');

// Runs after express-validator checks, returns first error in standard format
module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: errors.array()[0].msg,
    });
  }
  next();
};
