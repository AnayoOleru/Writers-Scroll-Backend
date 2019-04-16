const getAuthorsIdFromArticle = (req, obj) => {
  const allUserIds = obj.map(item => item.Article.author.id);

  const uniqueIds = [...new Set(allUserIds)];

  const removeUserOwnId = uniqueIds.filter(
    item => item !== req.user.userObj.id
  );

  return removeUserOwnId;
};

export default getAuthorsIdFromArticle;
