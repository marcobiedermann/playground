const defaults = {
  width : window.innerWidth,
  height: window.innerHeight,
  limit: 5
};

class KochSnowflake {

  constructor(element, options) {
    Object.assign(this, defaults, options);

    this.element = element;

    this.init();
    this.render(options);
  }

  init() {
    const canvas  = this.canvas   = document.querySelector(this.element);
    const context = this.context  = this.canvas.getContext('2d');
    const width   = canvas.width  = this.width;
    const height  = canvas.height = this.height;

    context.translate(width / 2, height / 2);
  }

  drawPath(points) {
    const { context } = this;

    let pointsLength = points.length;

    context.beginPath();

    while(pointsLength--) {
      context.lineTo(points[pointsLength].x, points[pointsLength].y);
    }

    context.stroke();
  }

  koch(p0, p1, limit) {
    const PI = Math.PI;

    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;

    const angle    = Math.atan2(dy, dx);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const unit     = distance / 3;

    const pA = {
      x: p0.x + dx / 3,
      y: p0.y + dy / 3
    };
    const pB = {
      x: pA.x + Math.cos(angle - PI / 3) * unit,
      y: pA.y + Math.sin(angle - PI / 3) * unit
    };
    const pC = {
      x: p1.x - dx / 3,
      y: p1.y - dy / 3
    };

    if (limit > 1) {
      this.koch(p0, pA, limit - 1);
      this.koch(pA, pB, limit - 1);
      this.koch(pB, pC, limit - 1);
      this.koch(pC, p1, limit - 1);
    } else {
      this.drawPath([p0, pA, pB, pC, p1]);
    }
  }

  render(options) {
    const { limit } = this;

    const p0 = {
      x: 0,
      y: -321
    };
    const p1 = {
      x: 278,
      y: 160
    };
    const p2 = {
      x: -278,
      y: 160
    };

    this.koch(p0, p1, limit);
    this.koch(p1, p2, limit);
    this.koch(p2, p0, limit);
  }

}

export default KochSnowflake;
