const defaults = {
  width: window.innerWidth,
  height: window.innerHeight,
  limit: 5,
};

class SierpinskiCarpet {
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

    const size = this.size = Math.min(width, height);
  }

  carpet(size, limit, x0, y0) {
    let x;
    let y;

    size /= 3;

    if (limit > 0) {
      this.context.fillRect(size + x0, size + y0, size, size);
      limit--;

      for (x = 0; x < 3; x++) {
        for (y = 0; y < 3; y++) {
          this.carpet(size, limit, x0 + x * size, y0 + y * size);
        }
      }
    }
  }

  render(options) {
    this.carpet(this.size, this.limit, 0, 0);
  }
}

export default SierpinskiCarpet;

