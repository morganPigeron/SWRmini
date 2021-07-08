import { AmbientLight, GreaterEqualStencilFunc, Vector3 } from "three";
import { ThreeJsService } from "./core/threeJsService";

export async function app() { // now here we can use await without any problem


  const threeJsService = new ThreeJsService();

  const galaxy = await threeJsService.loadGltfModel("assets/galaxy/scene.gltf",{tx:-11,ty:11,tz:-11,rx:Math.PI/2,ry:0,rz:0}); // offset coordinate is optional
  const planet = await threeJsService.loadGltfModel(
    "assets/planets/planete1.gltf"
  );

  threeJsService.addlight(new AmbientLight(0x404040));

  
  galaxy.scale.set(0.1, 0.1, 0.1);
  // add function to main update loop
  threeJsService.addUpdate(()=>{
    galaxy.parent!.rotation.y += 0.001; // rotate from parent coordinate (global axis)
  });


  planet.position.set(5, 0, 0);
  planet.scale.set(0.1, 0.1, 0.1);
  // add another function to main update loop
  threeJsService.addUpdate(()=>{
    planet.parent!.rotation.y += 0.01; // rotate from parent coordinate (global axis) (année)
    planet.rotateY(0.01); // (jour)
  });


}
