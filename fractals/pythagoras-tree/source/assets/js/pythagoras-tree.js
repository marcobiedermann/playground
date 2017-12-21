import degreesToRadians from './degrees-to-radians';

const defaults = {
  width: window.innerWidth,
  height: window.innerHeight,
  size: 100,
  limit: 10,
};

class PythagorasTree {
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
  }

  pythagorasTree(size, limit) {
    const { context } = this;

    size = Math.sin(degreesToRadians(45)) * size;

    if (limit > 0) {
      context.rotate(degreesToRadians(-45));
      context.fillRect(0, 0, size, size);

      context.save();
      context.translate(size, 0);

      this.pythagorasTree(size, limit - 1);

      context.restore();

      context.fillRect(-size, size, size, size);

      context.save();
      context.translate(0, 2 * size);
      context.rotate(degreesToRadians(90));

      this.pythagorasTree(size, limit - 1);

      context.restore();
    }
  }

  render(opitons) {
    const {
      width, height, context, size, limit,
    } = this;

    context.fillRect(width / 2 - size / 2, height / 2 - size / 2, size, size);
    context.translate(width / 2 - size / 2, height / 2 - size / 2);
    context.rotate(degreesToRadians(-90));

    this.pythagorasTree(size, limit);
  }
}

export default PythagorasTree;
