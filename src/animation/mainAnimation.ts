import { GUI } from "dat.gui";
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Clock,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Color,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export abstract class MainAnimation {
  protected models: Model3D[] = [];

  constructor(
    protected camera: PerspectiveCamera,
    public scene: Scene,
    protected renderer: WebGLRenderer,
    protected clock: Clock
  ) {}

  protected abstract fixedUpdate(deltaTime: number): void;
  protected abstract update(): void;

  public addModel(model: Model3D) {
    this.models.push(model);
  }

  public showModels() {
    this.models.forEach((m) => m.show(this.scene));
  }

  protected resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

export class DebugMainAnimation extends MainAnimation {
  private guiDebug: GUI;

  constructor() {
    const canvas = document.getElementById("anim") as HTMLCanvasElement;

    super(
      new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.25,
        20
      ),
      new Scene(),
      new WebGLRenderer({ canvas }),
      new Clock()
    );

    this.guiDebug = new GUI();

    this.camera.position.z = 2;

    this.guiDebug.add(this.camera.position, "y").min(-10).max(0);

    //control
    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    //background
    this.scene.background = new Color(0x222222);

    //event
    window.addEventListener("resize", () => this.resize());

    //anim
    this.clock = new Clock();

    //size
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.renderer.setAnimationLoop(() => this.update());
  }

  public fixedUpdate(deltaTime: number) {}

  public update() {
    this.fixedUpdate(this.clock.getDelta());
    this.renderer.render(this.scene, this.camera);
  }

  public loadModels(url: string) {
    const loader = new GLTFLoader();
    // Load a glTF resource
    loader.load(
      // resource URL
      url,
      // called when the resource is loaded
      (gltf) => {
        this.scene.add(gltf.scene);
        //gltf.animations; // Array<THREE.AnimationClip>
        //gltf.scene; // THREE.Group
        //gltf.scenes; // Array<THREE.Group>
        //gltf.cameras; // Array<THREE.Camera>
        //gltf.asset; // Object
      },
    
      // called while loading is progressing
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      (error) => {
        console.log(`An error happened ${error}`);
      }
    );
  }
}

export abstract class Model3D {
  public abstract show(scene: Scene): void;
}
export class Galaxy extends Model3D {
  public show(scene: Scene) {}
}
