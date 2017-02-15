class Rose {

  constructor(element, options) {
    const defaults = {
      width: 600,
      height: 600,
      n: 5,
      d: 8,
      amplitude: 200,
      step: 0.1
    };

    this.element = element;

    Object.assign(this, defaults, options);

    this.init();
    this.render();
  }

  init() {
    const { element, width, height } = this;

    const canvas  = this.canvas = document.querySelector(element);
    const context = this.context = canvas.getContext('2d');

    canvas.width  = width;
    canvas.height = height;

    context.translate(width / 2, height / 2);
  }

  render(options) {
    const { context, n, d, amplitude, step } = Object.assign(this, options);

    const k = n / d;

    context.beginPath();

    for (let theta = 0; theta < Math.PI * d * 2; theta += step) {
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

    this.render(options)
  }

}

export default Rose;
