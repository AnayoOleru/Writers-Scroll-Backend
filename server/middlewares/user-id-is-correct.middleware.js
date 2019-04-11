const checkIfUserIdIsCorrect = (req, res, next) => {
  if (req.params.userid !== req.user.userObj.id) {
    return res.status(401).json({
      errors: {
        body: ["Sorry, you cannot access another user's reading statistic"],
      },
    });
  }
  return next();
};

export default { checkIfUserIdIsCorrect };
