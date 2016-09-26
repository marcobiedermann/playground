function drawPath(points) {
  var length = points.length;
  var i;

  context.beginPath();

  for (i = 0; i < length; i++){
    context.lineTo(points[i].x, points[i].y);
  }

  context.stroke();
}
