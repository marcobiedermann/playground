import * as THREE from 'three';

class Smoke {
  constructor(element, options) {
    const defaults = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.element = element;

    Object.assign(this, options, defaults);
    this.onResize = this.onResize.bind(this);

    this.addEventListeners();
    this.init();
  }

  init() {
    const { element, width, height } = this;

    this.clock = new THREE.Clock();

    const renderer = this.renderer = new THREE.WebGLRenderer({
      canvas: element,
    });

    renderer.setSize(width, height);

    this.scene = new THREE.Scene();

    const meshGeometry = new THREE.CubeGeometry(200, 200, 200);
    const meshMaterial = new THREE.MeshLambertMaterial({
      color: 0xaa6666,
      wireframe: false,
    });
    this.mesh = new THREE.Mesh(meshGeometry, meshMaterial);

    this.cubeSineDriver = 0;

    this.addCamera();
    this.addLights();
    this.addParticles();
    this.addBackground();
  }

  evolveSmoke(delta) {
    const { smokeParticles } = this;

    let smokeParticlesLength = smokeParticles.length;

    while (smokeParticlesLength--) {
      smokeParticles[smokeParticlesLength].rotation.z += delta * 0.2;
    }
  }

  addLights() {
    const { scene } = this;
    const light = new THREE.DirectionalLight(0xffffff, 0.75);

    light.position.set(-1, 0, 1);
    scene.add(light);
  }

  addCamera() {
    const { scene } = this;
    const camera = this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 10000);

    camera.position.z = 1000;
    scene.add(camera);
  }

  addParticles() {
    const { scene } = this;
    const textureLoader = new THREE.TextureLoader();
    const smokeParticles = this.smokeParticles = [];

    textureLoader.load('assets/images/clouds.png', (texture) => {
      const smokeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: texture,
        transparent: true,
      });
      smokeMaterial.map.minFilter = THREE.LinearFilter;
      const smokeGeometry = new THREE.PlaneBufferGeometry(300, 300);

      const smokeMeshes = [];
      let limit = 150;

      while (limit--) {
        smokeMeshes[limit] = new THREE.Mesh(smokeGeometry, smokeMaterial);
        smokeMeshes[limit].position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 1000 - 100);
        smokeMeshes[limit].rotation.z = Math.random() * 360;
        smokeParticles.push(smokeMeshes[limit]);
        scene.add(smokeMeshes[limit]);
      }
    });
  }

  addBackground() {
    const { scene } = this;
    const textureLoader = new THREE.TextureLoader();
    const textGeometry = new THREE.PlaneBufferGeometry(600, 320);

    textureLoader.load('assets/images/background.jpg', (texture) => {
      const textMaterial = new THREE.MeshLambertMaterial({
        blending: THREE.AdditiveBlending,
        color: 0xffffff,
        map: texture,
        opacity: 1,
        transparent: true,
      });
      textMaterial.map.minFilter = THREE.LinearFilter;
      const text = new THREE.Mesh(textGeometry, textMaterial);

      text.position.z = 800;
      scene.add(text);
    });
  }

  render() {
    const { mesh } = this;
    let { cubeSineDriver } = this;

    cubeSineDriver += 0.01;

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
    mesh.position.z = 100 + Math.sin(cubeSineDriver) * 500;

    this.renderer.render(this.scene, this.camera);
  }

  update() {
    this.evolveSmoke(this.clock.getDelta());
    this.render();

    requestAnimationFrame(this.update.bind(this));
  }

  onResize() {
    const { camera } = this;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    camera.aspect = windowWidth / windowHeight;
    camera.updateProjectionMatrix();

    this.renderer.setSize(windowWidth, windowHeight);
  }

  addEventListeners() {
    window.addEventListener('resize', this.onResize);
  }
}

export default Smoke;
