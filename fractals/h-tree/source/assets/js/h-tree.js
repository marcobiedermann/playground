import degreesToRadians from './degrees-to-radians';

const defaults = {
  width : window.innerWidth,
  height: window.innerHeight,
  direction: -90,
  angle: 20,
  limit: 10
};

class HTree {

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


  hTree(p0, angle, limit) {

    if (limit > 0) {
      const pA = {
        x: p0.x + (Math.cos(degreesToRadians(angle)) * limit * 8),
        y: p0.y + (Math.sin(degreesToRadians(angle)) * limit * 8)
      };

      this.drawPath([p0, pA]);
      this.hTree(pA, angle - this.angle, limit - 1);
      this.hTree(pA, angle + this.angle, limit - 1);
    }

  }

  render(options) {
    const { context } = this;
    const p0 = {
      x: 0,
      y: 250
    };

    context.beginPath();

    this.hTree(p0, this.direction, this.limit);

    context.closePath();
    context.stroke();
  }

}

export default HTree;
