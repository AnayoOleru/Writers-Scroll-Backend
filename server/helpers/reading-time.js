const calculateTime = (...args) => {
  let totalWords = 0;
  args.forEach(words => {
    totalWords = words.split(' ').length + totalWords;
  });

  const wordsPerMinutes = (totalWords / 200).toFixed(2);
  const time = `${wordsPerMinutes}`.split('.');
  const minute = parseFloat(time[0]);
  const seconds = (parseFloat(time[1]) * 0.6).toFixed(0);
  if (seconds > 30) {
    return Number(`${minute + 1}`);
  }
  return Number(`${minute}`);
};

export default calculateTime;
