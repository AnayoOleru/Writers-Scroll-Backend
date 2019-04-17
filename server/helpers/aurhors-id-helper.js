const getAuthorsIdFromArticle = (req, obj) => {
  const allUserIds = obj.map(item => item.Article.author.id);

  const uniqueIds = [...new Set(allUserIds)];

  // returning all ids without the id of the user making the request
  return uniqueIds.filter(item => item !== req.user.userObj.id);
};

export default getAuthorsIdFromArticle;
