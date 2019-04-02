import getProfile from '../helpers/profiler';

const controller = {
  /**
   * @description Get User Profile
   * @param {*} req
   * @param {*} res
   * @returns {object} response and user profile data
   */
  getUserProfile(req, res) {
    const profile = getProfile(req.data);

    return res.status(200).json({
      data: [profile],
    });
  },
};

export default controller;
