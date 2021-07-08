import { AmbientLight } from "three";
import { ThreeJsService } from "./core/threeJsService";

export async function app() { // now here we can use await without any problem


  const threeJsService = new ThreeJsService();

  const galaxy = await threeJsService.loadGltfModel("assets/galaxy/scene.gltf");
  const planet = await threeJsService.loadGltfModel(
    "assets/planets/planete1.gltf"
  );

  threeJsService.addlight(new AmbientLight(0x404040));

  galaxy.position.set(-11, -11, 11);
  galaxy.scale.set(0.1, 0.1, 0.1);

  planet.position.set(2, 0, 0);
  planet.scale.set(0.1, 0.1, 0.1);


}
