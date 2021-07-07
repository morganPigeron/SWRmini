import { GUI } from "dat.gui";
import THREE, { AxesHelper, Camera, PerspectiveCamera, PMREMGenerator, Renderer, Scene, SpotLight, sRGBEncoding, UnsignedByteType, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader";
import { DebugMainAnimation, Galaxy } from "./animation/mainAnimation"

/*
console.log('test')

const anim = new DebugMainAnimation();
//const cube = new Cube3D();
//const galaxy = new Galaxy(anim.scene);
anim.loadModels("assets/galaxy/scene.gltf")
anim.showModels();
*/


///////////////////////////////
//https://sbcode.net/threejs/loaders-gltf/
///////////////////////////////

const scene:Scene = new Scene()
const axesHelper = new AxesHelper(5)
scene.add(axesHelper)

//var light = new SpotLight();
//light.position.set(5, 5, 5)
//light.intensity = 1
//scene.add(light);

const camera: PerspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 7
camera.position.x = 7
camera.position.y = 5

const renderer: WebGLRenderer = new WebGLRenderer()
//renderer.physicallyCorrectLights = true
//renderer.shadowMap.enabled = true
renderer.outputEncoding = sRGBEncoding
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)


// Transform control :


// Loading the galaxy model

const loader = new GLTFLoader()
loader.load(
    'assets/galaxy/scene.gltf',
    function (gltf) {
        // gltf.scene.traverse(function (child) {
        //     if ((<THREE.Mesh>child).isMesh) {
        //         let m = <THREE.Mesh>child
        //         m.receiveShadow = true
        //         m.castShadow = true
        //     }
        //     if ((<THREE.Light>child).isLight) {
        //         let l = <THREE.Light>child
        //         l.castShadow = true
        //         //l.shadow.bias = -.003
        //         l.shadow.mapSize.width = 2048
        //         l.shadow.mapSize.height = 2048
        //     }
        // })
        let galaxy
        galaxy = gltf.scene.children[0];
        galaxy.position.set(-11,-11,11);
        galaxy.scale.set(0.1, 0.1, 0.1)
        
        
        scene.add(gltf.scene);
        
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
    },
    (error) => {
        console.log(error);
    }
);





// Automatic window resizing

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}





// animation
var animate = function () {
    requestAnimationFrame(animate)

    controls.update()

    render()

};

function render() {
    renderer.render(scene, camera)
}
animate();