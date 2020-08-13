const AdminRoleMiddleware = async (req, res, next) => {
  try {
    if (req.loggedUser.role === 'ADMIN') {
      next();
    } else {
      return res.json({
        error: true,
        message: 'Auth Error: Role is not sufficient'
      });
    }
  } catch (err) {
    console.log('There was an error /me', err, JSON.stringify(err));
    return res.json({
      error: true,
      fullError: err,
      name: err.name,
      json: JSON.stringify(err)
    });
  }
};
exports.AdminRoleMiddleware = AdminRoleMiddleware;
