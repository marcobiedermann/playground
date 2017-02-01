import Nodes from './nodes';

class NodeGarden {
  constructor(element, options) {
    const defaults = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    Object.assign(this, options, defaults);

    this.element = element;

    this.init();
  }

  init() {
    const canvas  = document.querySelector(this.element);
    this.context = canvas.getContext('2d');

    const width  = canvas.width  = this.width;
    const height = canvas.height = this.height;

    this.nodes = new Nodes({
      width,
      height
    });
  }

  render(context) {
    this.nodes.render(context)
  }

  update() {
    const { context, width, height } = this;

    this.context.clearRect(0, 0, width, height);
    this.render(context);

    requestAnimationFrame(this.update.bind(this));
  }

}

export default NodeGarden;
