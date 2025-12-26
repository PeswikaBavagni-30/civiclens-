const adminOnly = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({
        message: "Access denied: Admins only",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = adminOnly;
