function getDistance(vectorA, vectorB) {
  const dx = vectorB.x - vectorA.x;
  const dy = vectorB.y - vectorA.y;

  return Math.sqrt(dx * dx + dy * dy);
}

export default getDistance;
