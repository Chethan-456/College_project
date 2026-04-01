// Usage: router.get('/route', auth, roles('principal', 'hod'), controller)
module.exports = (...allowedRoles) => (req, res, next) => {
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ success: false, error: 'Access denied: insufficient role' });
  }
  next();
};
