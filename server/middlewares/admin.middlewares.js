// Is user an admin?
const checkAdmin = (req, res, next) => {
  const adminId = req.user.userObj.id;
  const userId = req.params.id;
  if (adminId === userId) {
    return res.status(403).json({
      errors: {
        body: ['You are already an admin'],
      },
    });
  }
  return next();
};

export default { checkAdmin };
