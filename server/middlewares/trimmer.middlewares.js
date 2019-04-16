const trimmer = (req, res, next) => {
  const { body } = req;

  Object.keys(body).forEach(val => {
    if (typeof body[val] === 'string') {
      body[val] = body[val].trim();
    }
  });
  return next();
};

export default trimmer;
