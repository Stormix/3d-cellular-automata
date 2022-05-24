import { PerspectiveCamera, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { MainScene } from "./scene";

export class Engine {
  private static _instance: Engine;
  private _initilized = false;
  private _renderer!: WebGLRenderer;
  private _scene!: MainScene;
  private _camera!: PerspectiveCamera;
  private _stats!: Stats;
  private _controls!: OrbitControls;

  private constructor() {
    // Pass
  }

  public static getInstance(): Engine {
    if (!Engine._instance) {
      Engine._instance = new Engine();
    }
    if (!Engine._instance._initilized) {
      Engine._instance.start();
      Engine._instance._initilized = true;
    }
    return Engine._instance;
  }

  public onWindowResize(): void {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public setupControls(): void {
    this._controls = new OrbitControls(this._camera, this._renderer.domElement);
    this._controls.addEventListener("change", () => this.update());
  }

  public setupCamera(): PerspectiveCamera {
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = 5;
    return camera;
  }

  public setupRenderer(): WebGLRenderer {
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
  }

  public start(): void {
    console.info("Engine started");
    this._renderer = this.setupRenderer();
    this._scene = new MainScene().start();
    this._camera = this.setupCamera();
    this._stats = Stats();

    this.setupControls();

    document.body.appendChild(this._renderer.domElement);
    document.body.appendChild(this._stats.dom);
  }

  public update(): void {
    requestAnimationFrame(() => this.update());
    this.render();

    this._stats.update();
    this._scene.update();
  }

  public render() {
    this._renderer.render(this._scene.scene, this._camera);
  }
}
