class Rose {

  constructor(element, options) {
    const canvas  = this.canvas = element;
    const context = this.context = canvas.getContext('2d');
    const defaults = {
      n: 5,
      d: 8,
      amplitude: 200,
      nodes: 100
    };

    this.options = Object.assign(this, defaults, options);

    this.setSize();
    this.update();
    this.addEventListeners();
  }

  render() {
    const { context } = this;
    const { n, d, amplitude, nodes } = this.options;
    const k = n / d;

    context.beginPath();

    for (let theta = 0; theta < 2 * Math.PI * d; theta += 2 * Math.PI / nodes) {
      const x = amplitude * Math.cos(k * theta) * Math.cos(theta);
      const y = amplitude * Math.cos(k * theta) * Math.sin(theta);

      context.lineTo(x, y);
    }

    context.closePath();
    context.stroke();
  }

  update(options) {
    const { context, width, height } = this;

    context.clearRect(width / -2, height / -2, width, height);

    this.render()

    requestAnimationFrame(() => this.update());
  }

  setSize() {
    const { canvas } = this;

    const width  = this.width  = canvas.width  = window.innerWidth;
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

export default Rose;
