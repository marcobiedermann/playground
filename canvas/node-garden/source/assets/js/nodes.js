import getDistance from './get-distance';
import Node from './node';

class Nodes {
  constructor(options) {
    const defaults = {
      length: 150,
      maxDistance: 200,
    };

    Object.assign(this, options, defaults);

    this.init();
  }

  init() {
    const { length, width, height } = this;

    this.nodes = [];

    for (let i = 0; i < length; i++) {
      this.nodes.push(new Node({
        x: Math.random() * width,
        y: Math.random() * height,
      }));
    }
  }

  render(context) {
    const {
      length, nodes, maxDistance, width, height,
    } = this;

    for (let i = 0; i < length; i++) {
      this.nodes[i].update(context, width, height);
    }

    for (let i = 0; i < length - 1; i++) {
      const nodeA = nodes[i];

      for (let j = i + 1; j < length; j++) {
        const nodeB = nodes[j];
        const distance = getDistance(nodeA, nodeB);

        if (distance < maxDistance) {
          context.lineWidth = 1 - distance / maxDistance;
          context.beginPath();
          context.moveTo(nodeA.x, nodeA.y);
          context.lineTo(nodeB.x, nodeB.y);
          context.stroke();
        }
      }
    }
  }
}

export default Nodes;
