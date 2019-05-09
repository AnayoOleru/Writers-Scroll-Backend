import Joi from 'joi';
import Authenticate from './auth';

/**
 * @description Validate UUIDs
 * @params {string} uuids
 * @returns {boolean} valid uuid
 */
const verifyUUID = (...args) => {
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
};

const validateArticlePage = page => {
  const schema = Joi.number().integer();
  const { error } = Joi.validate(page, schema);

  if (error) {
    return false;
  }
  return true;
};

const validProfileQueryString = query => {
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
};

const verifyAuthHeader = req => {
  try {
    if (!req.headers.authorization) {
      return { error: 'error' };
    }
    const token = req.headers.authorization;
    const payload = Authenticate.decode(token);
    return payload;
  } catch (err) {
    return { error: 'Invalid token' };
  }
};

const validEditableProfileBody = body => {
  let valid = true;
  const editableProfileFields = [
    'first_name',
    'last_name',
    'title',
    'bio',
    'is_activated',
    'phone_number',
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
};

const compareFieldWithToken = (field, token) => field === token;

const draftPublishMessage = isDraft => {
  if (isDraft) {
    return 'Article saved to draft';
  }

  return 'Article published successfully';
};

const validReportedArticleQueryString = query => {
  let valid = true;
  const searchableArticleField = ['status'];

  Object.keys(query).forEach(item => {
    if (!searchableArticleField.includes(item)) {
      valid = false;
    }
  });

  return valid;
};
const validations = {
  verifyUUID,
  validateArticlePage,
  validProfileQueryString,
  verifyAuthHeader,
  validEditableProfileBody,
  compareFieldWithToken,
  draftPublishMessage,
  validReportedArticleQueryString,
};

export default validations;
