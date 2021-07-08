import { ThreeJsService } from "./core/threeJsService";  

const threeJsService = new ThreeJsService();

// threejsService(Url, positionX, positionY, positionZ)
threeJsService.loadGltfModel('assets/galaxy/scene.gltf', -11, -11, 11);
threeJsService.loadGltfModel('assets/planets/planete1.gltf', 2,0,0,);
