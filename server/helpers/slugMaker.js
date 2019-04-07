const slug = (articleBody, slugSeperator) => {
  if (typeof slugSeperator !== 'string') {
    return false;
  }

  const fieldsThatCanBeASlug = ['title', 'body'];
  Object.keys(articleBody).forEach(item => {
    if (!fieldsThatCanBeASlug.includes(item)) {
      return false;
    }
  });

  if (articleBody.title) {
    const nameWithOneSpace = articleBody.title.trim().replace(/\s\s+/g, ' ');
    const newNameWithOneSpace = nameWithOneSpace.replace(/\s/g, slugSeperator);
    return `${newNameWithOneSpace}${slugSeperator}${Date.now()}`;
  }
  if (!articleBody.title && articleBody.body) {
    const bodyTitle = [];
    const titleArray = articleBody.body.trim().split(' ');
    if (titleArray.length < 5) {
      return false;
    }
    for (let i = 0; i < 5; i += 1) {
      bodyTitle.push(titleArray[i]);
    }
    const slugTitle = bodyTitle.join(' ').replace(/\s/g, slugSeperator);
    return `${slugTitle}${slugSeperator}${Date.now()}`;
  }
};

export default slug;
