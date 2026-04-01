// Forces HOD users to only access their own department's data.
// Overwrites `req.query.department` for HODs.
// Other roles pass through unmodified.
//
// Usage: router.get('/route', auth, deptScope, controller)

module.exports = (req, res, next) => {
  if (req.user.role === 'hod' && req.user.department) {
    // Force department filter to HOD's own department
    req.query.department = req.user.department.toString();
  }
  next();
};
