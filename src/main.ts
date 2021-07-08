import { AmbientLight } from "three";
import { ThreeJsService } from "./core/threeJsService";  

const threeJsService = new ThreeJsService();

const galaxy = threeJsService.loadGltfModel('assets/galaxy/scene.gltf');
const planet = threeJsService.loadGltfModel('assets/planets/planete1.gltf');

threeJsService.addlight(new AmbientLight( 0x404040 ));


galaxy.then(g=>{
    g.position.set(-11,-11,11);
    g.scale.set(0.1, 0.1, 0.1);
});

planet.then(p=>{
    p.position.set(2,0,0);
    p.scale.set(0.1,0.1,0.1);
})
