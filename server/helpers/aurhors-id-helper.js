const getAuthorsIdFromArticle = (req, obj) => {
  const allUserIds = obj.map(item => item.Article.author.id);

  const uniqueIds = [...new Set(allUserIds)];

  const ids = uniqueIds.filter(item => item !== req.user.userObj.id);

  return ids;
};

export default getAuthorsIdFromArticle;
