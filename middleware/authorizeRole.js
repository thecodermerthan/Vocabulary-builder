function authorizeRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.customer || !allowedRoles.includes(req.customer.role)) {
      return res.status(403).json({ error: "You do not have permission to access this resource" });
    }
    next();
  };
}

module.exports = authorizeRole;