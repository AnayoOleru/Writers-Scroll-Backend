const profiler = user => {
  const profile = {
    id: user.id,
    firstname: user.first_name,
    lastname: user.last_name,
    title: user.title,
    bio: user.bio,
    phonenumber: user.phone_number,
    email: user.email,
    isreviewer: user.is_reviewer,
    researchfield: user.research_field,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return profile;
};

const followStatus = obj => {
  if (!obj) {
    return false;
  }
  return true;
};

const profileHelpers = { profiler, followStatus };

export default profileHelpers;
