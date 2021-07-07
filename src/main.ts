import { ThreeJsService } from "./core/threeJsService"; 
const threeJsService = new ThreeJsService();
threeJsService.loadGltfModel('assets/galaxy/scene.gltf');
threeJsService.loadGltfModel('assets/planets/planete1.gltf');