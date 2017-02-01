class Node {
  constructor(options) {
    const defaults = {
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
      radius: 2
    };

    Object.assign(this, options, defaults);
  }

  render(context) {
    const { x, y, radius } = this;

    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  update(context, width, height) {
    const { x, y, vx, vy } = this;

    this.x += vx;
    this.y += vy;

    if (x < 0) {
      this.x = width;
    } else if (x > width) {
      this.x = 0
    }

    if (y < 0) {
      this.y = height;
    } else if (y > height) {
      this.y = 0
    }

    this.render(context);
  }
}

export default Node;
