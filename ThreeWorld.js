import {
  DirectionalLight,
  BoxGeometry,
  Clock,
  Mesh,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  MeshToonMaterial,
} from 'three';

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

class ThreeWorld {
  scene = new Scene();
  clock = new Clock();
  camera = new PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
  directionalLight = new DirectionalLight('#fff', 1);
  objects = [];
  renderer;
  offsetY = 0;
  objectDistance = 4;

  constructor(canvas, scrollbar, sections) {
    this.renderer = new WebGLRenderer({
      canvas,
      alpha: true,
    });
    this.scrollbar = scrollbar;
    this.sections = sections;
  }

  configRenderer() {
    this.renderer.setSize(sizes.width, sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  configCamera() {
    this.camera.position.z = 6;
    this.scene.add(this.camera);
  }

  configDirectionalLight() {
    this.directionalLight.position.set(1, 1, 0);
    this.scene.add(this.directionalLight);
  }

  createObject() {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshToonMaterial({ color: '#5c1c64' });
    const mesh = new Mesh(geometry, material);
    mesh.position.x = -1;
    this.objects.push(mesh);
    mesh.position.y = -this.objectDistance * (this.objects.length - 1);
    this.scene.add(mesh);
  }
  createObjects() {
    for (let i = 0; i < this.sections.length; i++) {
      this.createObject();
    }
  }

  onSroll() {
    this.scrollbar.addListener((status) => {
      this.offsetY = status.offset.y;
    });
  }

  onResize() {
    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      this.camera.aspect = sizes.width / sizes.height;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(sizes.width, sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  tick() {
    this.camera.position.y = (-this.offsetY / sizes.height) * this.objectDistance;

    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.tick.bind(this));
  }

  init() {
    this.onResize();
    this.configCamera();
    this.configRenderer();
    this.configDirectionalLight();
    this.tick();
    this.onSroll();
    this.createObjects();
  }
}

export default ThreeWorld;
