import { GUI } from "dat.gui";
import { PerspectiveCamera, Scene, WebGLRenderer, Clock, BoxGeometry, MeshBasicMaterial, Mesh, Vector3, Color } from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls} from'three/examples/jsm/controls/OrbitControls'
import { rgb } from "d3";

export abstract class MainAnimation {
  protected models: Model3D[] = [];

  constructor(
    protected camera: PerspectiveCamera,
    protected scene: Scene,
    protected renderer: WebGLRenderer,
    protected clock: Clock,
  ){}

  protected abstract fixedUpdate(deltaTime:number):void;
  protected abstract update():void;
  
  public addModel(model:Model3D) {
    this.models.push(model);
  }

  public showModels(){
    this.models.forEach(m=>m.show(this.scene));
  }

  protected resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

}

export class DebugMainAnimation extends MainAnimation {
  private guiDebug: GUI;

  constructor(){

    const canvas = document.getElementById("anim") as HTMLCanvasElement;

    super(
      new PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        10
      ),
      new Scene(),
      new WebGLRenderer({canvas}),
      new Clock()
    );

    this.guiDebug = new GUI();

    this.camera.position.z = 2;

    this.guiDebug
      .add(this.camera.position, 'y')
      .min(-10)
      .max(0);

    //control
    const controls = new OrbitControls( this.camera, this.renderer.domElement );

    //event
    window.addEventListener('resize', () => this.resize());

    //anim
    this.clock = new Clock();

    //size
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    
    this.renderer.setAnimationLoop(() => this.update());
  }

  public fixedUpdate(deltaTime:number) {
    
  }

  public update() {
    this.fixedUpdate(this.clock.getDelta());
    this.renderer.render(this.scene, this.camera);
  }

  public loadModels(url:string) {

  }
}


export abstract class Model3D {
  public abstract show(scene:Scene ):void;
}

export class Cube3D extends Model3D {

  private cube: Mesh;
  
  constructor() {
    super();
    const geometry = new BoxGeometry( Math.random()*0.01, Math.random()*0.01, Math.random()*0.01 );
    const material = new MeshBasicMaterial( {color: new Color(50,50,180) } );
    this.cube = new Mesh( geometry, material );
    
  }

  public show(scene:Scene) {
    this.cube.position.x = Math.random();
    this.cube.position.y = Math.random();
    this.cube.position.z = Math.random();
    scene.add( this.cube );
  }

}