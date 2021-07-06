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

var light = new SpotLight();
light.position.set(5, 5, 5)
scene.add(light);

const camera: PerspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 2

const renderer: WebGLRenderer = new WebGLRenderer()
//renderer.physicallyCorrectLights = true
//renderer.shadowMap.enabled = true
renderer.outputEncoding = sRGBEncoding
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)



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
        scene.add(gltf.scene);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
    },
    (error) => {
        console.log(error);
    }
);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}


var animate = function () {
    requestAnimationFrame(animate)

    controls.update()

    render()

};

function render() {
    renderer.render(scene, camera)
}
animate();