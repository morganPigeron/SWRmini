import { AmbientLight, Camera, PerspectiveCamera, Scene, Vector2, Vector3, Raycaster, Object3D, ArrowHelper } from "three";
import { MouseCoordinate } from "../component/toolTip/toolTip";
import { DebugWindow } from "../component/window/debugWindow";
import { ThreeJsService } from "../services/threeJsService";

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

  let camera = threeJsService.cam() //cette fonction renvoie l'objet camera, donne lui un nom plus explicite, 
  // ex getCamera. C'est bien tu as compris le principe, tu as besoin de la camera tu va la chercher dans
  // l'objet threeJsService via une petite fonction que tu as écris. 
  // par contre tu avait changé des variables de privé à public, ne fais pas ça, continue a ajouté des petites fonctions on rangera plus tard. 
  //Va voir threeJsService, j'ai tout remis en privé pour ne pas que l'on casse tout. 

  camera.position.set( 0,13, 0 );

  let scene = threeJsService.sceneUpdate(); // Tu as créer une fonction sceneUpdate qui retourne l'objet Scene.
  // n'hésite pas à lui donner un nom plus explicite , ex getScene.

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



  
  function onMouseMove( event:MouseEvent ) { // Tu avais oublié de mettre que c'est un évenement de type MouseEvent, si tu ne sais pas quel type mettre , tu peux uiliser Any, je changerais après.

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
        
        console.log(intersects)  // regarde la console et voit ce que tu peux récupérer de la liste d'objet intersect
        // J'ai enlevé le reste tu utilisais des fonctions "deprecated", regarde la doc officiel threeJs.
    }
  
  }
  
  threeJsService.addUpdate(raycast); // tu avais juste oublié d'ajouté ta fonction à la boucle d'update de threeJsService
  // tu peux y mettre n'importe quel fonction de type "updatable" regarde le dossier interface.
  // updatable c'est une fonction qui ne prend pas d'argument et qui ne renvoie rien " () => {} ".
  // elle sert a mettre des trucs qui seront appellé a chaque frame , par exemple ton raycast.


}




