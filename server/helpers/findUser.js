import model from '../models';

const { User } = model;
const findUser = async (field, value) => {
  try {
    const user = await User.findOne({ where: { field: value } });
    if (user) {
      return user;
    }
    return null;
  } catch (err) {
    return err;
  }
};

export default findUser;
