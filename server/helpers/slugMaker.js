const slug = articleTitle => {
  if (typeof articleTitle !== 'string') {
    return false;
  }

  const nameWithOneSpace = articleTitle.trim().replace(/\s\s+/g, ' ');
  const newNameWithOneSpace = nameWithOneSpace.replace(/\s/g, '-');
  return `${newNameWithOneSpace}-${Date.now()}`;
};

export default slug;
