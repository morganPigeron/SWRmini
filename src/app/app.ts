import { AmbientLight, Camera, PerspectiveCamera, Scene, Vector2, Vector3, Raycaster, Object3D, ArrowHelper } from "three";
import { MouseCoordinate } from "../component/toolTip/toolTip";
import { DebugWindow } from "../component/window/debugWindow";
import { ThreeJsService } from "../services/threeJsService";
import {Face3, Geometry} from "three/examples/jsm/deprecated/Geometry";

export async function app() {
  // now here we can use await without any problem

  const threeJsService = new ThreeJsService();
/*
  const galaxy = await threeJsService.loadGltfModel(
    "assets/galaxy/scene.gltf",
    { tx: -11, ty: 11, tz: -11, rx: Math.PI / 2, ry: 0, rz: 0 }
  ); // offset coordinate is optional
  */
  const planet = await threeJsService.loadGltfModel(
    "assets/planets/planete1.gltf"
  );

  threeJsService.addlight(new AmbientLight(0x404040));
/*
  galaxy.scale.set(0.1, 0.1, 0.1);
  // add function to main update loop
  threeJsService.addUpdate(() => {
    galaxy.parent!.rotation.y += 0.001; // rotate from parent coordinate (global axis)
  });
*/
  planet.position.set(5, 0, 0);
  planet.scale.set(0.1, 0.1, 0.1);
  // add another function to main update loop
/*
  threeJsService.addUpdate(() => {
    planet.parent!.rotation.y += 0.01; // rotate from parent coordinate (global axis) (année)
    planet.rotateY(0.01); // (jour)
  });
*/
  
  

  
  
  //test
  //window
  const testWindow = new DebugWindow("testWindow");
  testWindow.addElement("p", "test", Date.now());

  //mouse
  const mouse = new MouseCoordinate();
  setTimeout(() => {
    mouse.remove();
  }, 5000);

  // TEST RAYCASTER

  let camera = threeJsService.cam()
  camera.position.set( 0,13, 0 );

  let scene = threeJsService.sceneUpdate();

  const pointer = new Vector2();
  let raycaster = new Raycaster();
  let renderer = await threeJsService.rendererTest()

  //renderer.domElement.addEventListener('dblclick', onDoubleClick, false);
  window.addEventListener( 'mousemove', onMouseMove, false );

   let arrowHelper = new ArrowHelper(
    new Vector3(),
    new Vector3(),
    .25,
    0xffff00);
    scene.add(arrowHelper);



  
  function onMouseMove( event ) {

      pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }
  
  

  

  function raycast() {

    raycaster.setFromCamera( pointer, camera );
  


    const intersects = raycaster.intersectObjects(scene.children, false);

    if (intersects.length > 0) {
        //console.log(sceneMeshes.length + " " + intersects.length)
        //console.log(intersects[0])
        //console.log(intersects[0].object.userData.name + " " + intersects[0].distance + " ")
        //console.log(intersects[0].face.normal)
        // line.position.set(0, 0, 0);
        // line.lookAt(intersects[0].face.normal);
        // line.position.copy(intersects[0].point);
        console.log(intersects.length)

        let n = new Vector3();
        n.copy((intersects[0].face as Face3 ).normal);
        n.transformDirection(intersects[0].object.matrixWorld);

        arrowHelper.setDirection(n);
        arrowHelper.position.copy(intersects[0].point);

    }
  
  }
  

}




