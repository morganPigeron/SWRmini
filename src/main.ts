import { Cube3D, DebugMainAnimation } from "./animation/mainAnimation"

console.log('test')

const anim = new DebugMainAnimation();
const cube = new Cube3D();

for(let i = 0; i< 1000; i++) {
  const cube = new Cube3D();
  anim.addModel(cube);
}
anim.addModel(cube);



anim.showModels();