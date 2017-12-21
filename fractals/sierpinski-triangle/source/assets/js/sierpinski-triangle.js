const defaults = {
  width: window.innerWidth,
  height: window.innerHeight,
  limit: 5,
};

class SierpinskiTriangle {
  constructor(element, options) {
    Object.assign(this, defaults, options);

    this.element = element;

    this.init();
    this.render(options);
  }

  init() {
    const canvas = this.canvas = document.querySelector(this.element);
    const context = this.context = this.canvas.getContext('2d');
    const width = canvas.width = this.width;
    const height = canvas.height = this.height;

    context.translate(width / 2, height / 2);
  }

  drawTriangle(p0, p1, p2) {
    const { context } = this;

    context.moveTo(p0.x, p0.y);
    context.lineTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.fill();
  }

  sierpinski(p0, p1, p2, limit) {
    if (limit > 0) {
      const pA = {
        x: (p0.x + p1.x) / 2,
        y: (p0.y + p1.y) / 2,
      };
      const pB = {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2,
      };
      const pC = {
        x: (p2.x + p0.x) / 2,
        y: (p2.y + p0.y) / 2,
      };

      this.sierpinski(p0, pA, pC, limit - 1);
      this.sierpinski(p1, pB, pA, limit - 1);
      this.sierpinski(p2, pC, pB, limit - 1);
    } else {
      this.drawTriangle(p0, p1, p2);
    }
  }

  render() {
    const p0 = {
      x: 0,
      y: -321,
    };
    const p1 = {
      x: 278,
      y: 160,
    };
    const p2 = {
      x: -278,
      y: 160,
    };

    this.sierpinski(p0, p1, p2, this.limit);
  }
}

export default SierpinskiTriangle;
