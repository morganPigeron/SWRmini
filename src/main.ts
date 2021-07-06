import { Cube3D, DebugMainAnimation, Galaxy } from "./animation/mainAnimation"

console.log('test')

const anim = new DebugMainAnimation();
//const cube = new Cube3D();
const galaxy = new Galaxy(anim.scene);

for(let i = 0; i< 1000; i++) {
  const cube = new Cube3D();
  anim.addModel(cube);
}

anim.showModels();
