class HeartCurve {
  constructor(element, options) {
    const canvas  = this.canvas  = element;
    const context = this.context = canvas.getContext('2d');

    const defaults = {
      size: 200,
      nodes: 19,
      a: 14,
      b: 4,
      c: 2,
      d: 1
    };

    this.options = Object.assign(this, defaults, options);

    this.update();
    this.setSize();
    this.addEventListeners();
  }

  renderHeartCurve() {
    const { context } = this;
    const { size, nodes, a, b, c, d } = this.options;

    context.beginPath();

    for (let i = 0; i < 2 * Math.PI; i += 2 * Math.PI / nodes) {
      const x = size * Math.pow(Math.sin(i), 3);
      const y = (
                 -a * Math.cos(i) +
                  b * Math.cos(2 * i) +
                  c * Math.cos(3 * i) +
                  d * Math.cos(4 * i)
                ) / 16 * size;

      context.lineTo(x, y);
    }

    context.fillStyle = '#fff';
    context.fill();
    context.closePath();
  }

  render() {
    const { context, width, height } = this;

    context.fillStyle = '#fc6a8d';
    context.fillRect(width / -2, height / -2, width, height);

    this.renderHeartCurve();
  }

  update() {
    const { context, width, height } = this;

    context.clearRect(width / -2, height / -2, width, height);
    this.render();

    requestAnimationFrame(() => this.update());
  }

  setSize() {
    const { canvas } = this;

    const width = this.width  = canvas.width  = window.innerWidth;
    const height = this.height = canvas.height = window.innerHeight;

    this.context.translate(width / 2, height / 2);
  }

  onResize() {
    this.setSize();
  }

  addEventListeners() {
    window.addEventListener('resize', () => this.onResize());
  }
}

export default HeartCurve;
