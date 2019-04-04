import Joi from 'joi';

const validations = {
  /**
   * @description Validate UUIDs
   * @params {string} uuids
   * @returns {boolean} valid uuid
   */
  verifyUUID(...args) {
    let valid = true;
    const schema = Joi.string().guid({
      version: ['uuidv4'],
    });

    Object.keys(args).forEach(uuid => {
      const { error } = Joi.validate(args[uuid], schema);
      if (error) {
        valid = false;
      }
    });

    return valid;
  },
  validateArticlePage(page) {
    const schema = Joi.number().integer();
    const { error } = Joi.validate(page, schema);

    if (error) {
      return false;
    }
    return true;
  },

  validProfileQueryString(query) {
    let valid = true;
    const searchableProfileFields = [
      'first_name',
      'last_name',
      'title',
      'email',
      'is_reviewer',
      'research_field',
    ];

    Object.keys(query).forEach(item => {
      if (!searchableProfileFields.includes(item)) {
        valid = false;
      }
    });

    return valid;
  },
  validEditableProfileBody(body) {
    let valid = true;
    const editableProfileFields = [
      'first_name',
      'last_name',
      'title',
      'bio',
      'is_activated',
      'image_url',
      'email',
      'is_reviewer',
      'research_field',
    ];

    Object.keys(body).forEach(item => {
      if (!editableProfileFields.includes(item)) {
        valid = false;
      }
    });

    return valid;
  },

  verifyEmail(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .strict()
        .trim()
        .min(2)
        .required()
        .error(() => 'Kindly enter a valid email'),
    });
    const { error } = Joi.validate(req.body, schema);
    if (error) {
      return res.status(400).send({
        error: `${error.details[0].message}`,
      });
    }
    return next();
  },

  validatePassword(req, res, next) {
    const { password, confirmPassword } = req.body;
    const schema = Joi.object().keys({
      password: Joi.string()
        .strict()
        .trim()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .min(8)
        .required()
        .error(() => 'Password is required'),
      confirmPassword: Joi.string()
        .strict()
        .trim()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .min(8)
        .required()
        .error(() => 'confirmPassword is required'),
    });

    const { error } = Joi.validate(req.body, schema);
    if (error) {
      return res.status(400).send({
        error: `${error.details[0].message}`,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: 400,
        error: 'Passwords do not match',
      });
    }

    return next();
  },

  validateInput: (err, res, next) => {
    if (err) {
      res.status(400).json({
        status: 400,
        errors: {
          body: [err.details[0].message.split('"').join('')],
        },
      });
    } else {
      next();
    }
  },
};

export default validations;
