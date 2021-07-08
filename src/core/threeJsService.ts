import { AxesHelper, Clock, PerspectiveCamera, Scene, sRGBEncoding, WebGLRenderer, AmbientLight, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


export class ThreeJsService {
  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private loader: GLTFLoader;
  private controls: OrbitControls;
  private light = new AmbientLight( 0x404040 ); // soft white light
  



  constructor() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new WebGLRenderer();
    this.loader = new GLTFLoader();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.scene.add( this.light )
    
    this.addCanvasInHtml();

    this.addEventListener();
    this.addHelpers();
    
    this.animate(0);

  }

  private addHelpers() {
    //axis
    const axesHelper = new AxesHelper(5);
    this.scene.add(axesHelper);
    //orbit control
    this.camera.position.set( 0,13, 0 );
    this.controls.update();
  }

  private addCanvasInHtml() {
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  private addEventListener() {
    window.addEventListener("resize", () => this.onWindowResize(), false);
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private animate(t:number) {
    requestAnimationFrame(t=>this.animate(t));
    this.controls.update();
    this.render();
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
  }

  private lightning(){
    this.scene.add(this.light);
  }
  
  public loadGltfModel(url: string, x :number, y:number, z : number) {
    this.loader.load(
      url,
      (gltf) => {
        let galaxy;
        galaxy = gltf.scene.children[0];
        
        galaxy.position.set(x,y,z);
        galaxy.scale.set(0.1, 0.1, 0.1);

        this.scene.add(gltf.scene);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

