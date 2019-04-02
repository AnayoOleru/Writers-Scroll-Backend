/**
 * @description Delete unnecessary profile
 * @param {object} userData Data of the user
 * @returns {object} Necessary user profile details
 */
const getProfile = userData => {
  delete userData.dataValues.password;
  delete userData.dataValues.is_activated;

  return userData;
};

export default getProfile;
