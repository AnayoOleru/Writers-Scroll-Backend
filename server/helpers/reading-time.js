const calculateTime = (...args) => {
  let totalWords = 0;
  args.forEach(words => {
    totalWords = words.split(' ').length + totalWords;
  });

  const wordsPerMinutes = Number((totalWords / 200).toFixed(2));
  const minute = wordsPerMinutes.toFixed(0);
  const seconds = ((wordsPerMinutes % 200) * 0.6).toFixed(0);
  if (seconds > 30) {
    return Number(`${minute + 1}`);
  }
  return Number(`${minute}`);
};

export default calculateTime;
