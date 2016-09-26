function koch(p0, p1, limit) {
  var PI = Math.PI;

  var dx = p1.x - p0.x;
  var dy = p1.y - p0.y;

  var angle    = Math.atan2(dy, dx);
  var distance = Math.sqrt(dx * dx + dy * dy);
  var unit     = distance / 3;

  var pA = {
    x: p0.x + dx / 3,
    y: p0.y + dy / 3
  };
  var pB = {
    x: pA.x + Math.cos(angle - PI / 3) * unit,
    y: pA.y + Math.sin(angle - PI / 3) * unit
  };
  var pC = {
    x: p1.x - dx / 3,
    y: p1.y - dy / 3
  };

  if (limit > 1) {
    koch(p0, pA, limit - 1);
    koch(pA, pB, limit - 1);
    koch(pB, pC, limit - 1);
    koch(pC, p1, limit - 1);
  } else {
    drawPath([p0, pA, pB, pC, p1]);
  }
}
