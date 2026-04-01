// Allows access if the user is accessing their own resource OR has one of the allowed roles.
// Works by looking up the resource's `user` field and comparing to req.user.id.
//
// Usage: router.put('/:id', auth, selfOrRoles('principal','hod'), controller)
//
// For routes where :id is a User id directly:
//   selfOrRoles('principal', 'hod')
//
// For routes where :id is a Faculty/Student id (not User id),
//   the controller must handle self-check manually using the resource's `user` field.
//   In that case, use this middleware in "roles-only" mode and check self in controller.

module.exports = (...allowedRoles) => (req, res, next) => {
  // Self-access: the :id param matches the logged-in user's id
  if (req.params.id && req.user.id === req.params.id) {
    return next();
  }

  // Role-based access
  if (allowedRoles.includes(req.user.role)) {
    return next();
  }

  return res.status(403).json({ success: false, error: 'Access denied' });
};
