const spaceTrimmer = obj => {
  Object.keys(obj).forEach(item => {
    if (typeof obj[item] === 'string') {
      obj[item] = obj[item].trim();
    }
  });

  return obj;
};

export default spaceTrimmer;
