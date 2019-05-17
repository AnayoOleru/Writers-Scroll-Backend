const profiler = user => {
  const profile = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    title: user.title,
    bio: user.bio,
    image_url: user.image_url,
    phone_number: user.phone_number,
    email: user.email,
    is_reviewer: user.is_reviewer,
    research_field: user.research_field,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    is_activated: user.is_activated,
    is_reported: user.is_reported,
    is_notified: user.is_notified,
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
