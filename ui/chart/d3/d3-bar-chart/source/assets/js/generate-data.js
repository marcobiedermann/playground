import randomInteger from './random-integer';

function generateData(n) {
  const data = [];

  while (n--) {
    data.push({
      date: new Date(Date.now() - (n * 1000 * 60 * 60 * 24)),
      value: randomInteger(0, 12)
    });
  }

  return data;
}

export default generateData;
