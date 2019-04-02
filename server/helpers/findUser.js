import model from '../models';

const { User } = model;
const findUserByEmail = async email => {
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      return user;
    }
    return null;
  } catch (err) {
    return err;
  }
};

export default findUserByEmail;
