import ParticleSystem from "./modules/ParticleSystem";
import Vector2 from "./modules/Vector2";

import { Noise } from "noisejs";
import * as PIXI from "pixi.js";

let noise = new Noise(Math.random());
console.log(noise);
// window.ParticleSystem = ParticleSystem;

const pixi_canvas = document.getElementById("pixi-canvas");

let width = window.innerWidth;
let height = window.innerHeight;
const app = new PIXI.Application({
  width: width,
  height: height,
  view: pixi_canvas,
});
const ps = new ParticleSystem();
let blur = new PIXI.filters.BlurFilter();

// ps.emitters[0].pixi_container.filters = [blur];
app.stage.addChild(ps.emitters[0].pixi_container);
ps.emitters[0].startEmission();
// setTimeout(() => {
//   ps.emitters[0].stopEmission();
// }, 2000);

// pixi_canvas.addEventListener("mousedown", () => {
//   ps.emitters[0].startEmission();
// });

// pixi_canvas.addEventListener("mouseup", () => {
//   ps.emitters[0].stopEmission();
// });
app.ticker.add(() => {
  let angle = (ps.clock.millis / 1000) * 2.05;
  let line_emitter = ps.emitters[0];
  line_emitter.width = width * 1.1;
  line_emitter.position.x = width / 2 - line_emitter.width / 2;
  line_emitter.position.y = -10;
  // ps.emitters[0].position.x = Math.sin(angle) * 250 + width / 2;
  // ps.emitters[0].position.y = Math.cos(angle) * 250 + height / 2;
  ps.update();

  //   ps.emitters[0].position.x = 0;
  //   ps.emitters[0].position.y = 0;
  let delta = ps.clock.getDeltaMillis();
  let fps = 1000 / delta;

  //   blur.blur = 2.5;
});
// function animate() {
//   //   ctx.fillText(Math.floor(fps), 10, 20);

//   requestAnimationFrame(animate);
// }

// animate();
