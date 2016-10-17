function generateData(n) {
  const data = [];

  while (n--) {
    data.push({
      date: new Date(Date.now() - (n * 1000 * 60 * 60 * 24)),
      value: generateRandomInteger(0, 12)
    });
  }

  return data;
}

function generateRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default generateData;
