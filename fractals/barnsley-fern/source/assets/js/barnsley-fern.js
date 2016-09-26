const defaults = {
  width  : window.innerWidth,
  height : window.innerHeight,
  scale  : 75,
  opacity: 0.5
};

class BarnsleyFern {

  constructor(element, options) {
    Object.assign(this, defaults, options);

    this.element = element;

    this.init();
    this.update(options);
  }

  init() {
    const canvas  = this.canvas   = document.querySelector(this.element);
    const context = this.context  = this.canvas.getContext('2d');
    const width   = canvas.width  = this.width;
    const height  = canvas.height = this.height;

    context.translate(width / 2, height);
  }

  getRule(rules) {
    let rulesLenght = rules.length;
    let random = Math.random();

    while (rulesLenght--) {
      const rule = rules[rulesLenght];

      if (random < rule.weight) {
        return rule;
      }

      random -= rule.weight;
    }

  }

  render(options) {
    const { scale, opacity } = this;

    let iterations = 100;
    let x = Math.random();
    let y = Math.random();

    while (iterations--) {
        const rule = this.getRule(this.rules);
        const x1 = x * rule.a + y * rule.b + rule.tx;
        const y1 = x * rule.c + y * rule.d + rule.ty;

        x = x1;
        y = y1;

        this.context.fillRect(x * scale, -y * scale, opacity, opacity);
    }

  }

  update(options) {
    this.render(options)
    requestAnimationFrame(this.update.bind(this));
  }

}

export default BarnsleyFern;
