import validations from '../helpers/validations';

const checkUUID = (req, res, next) => {
  if (!validations.verifyUUID(req.params.userid)) {
    return res.status(400).json({
      errors: {
        body: ['userId is not valid'],
      },
    });
  }
  return next();
};

export default { checkUUID };
