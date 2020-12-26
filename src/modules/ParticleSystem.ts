import Clock from "./Clock";
import ParticleEmitter, { LineEmitter } from "./ParticleEmitter";
import ParticleForceBase, { ParticleForceDirectional } from "./ParticleForce";

import * as PIXI from "pixi.js";

import { fit_range } from "./Utils";
export default class ParticleSystem {
  emitters: ParticleEmitter[];
  forces: Array<ParticleForceBase>;
  clock: Clock;
  constructor() {
    // super();
    // this.autoResize = true;
    this.emitters = Array<ParticleEmitter>();
    let line_emitter = new LineEmitter();
    line_emitter.width = 250;

    this.emitters.push(line_emitter);

    // this.emitters[0].position.x = 250;
    // this.emitters[0].position.y = 100;
    this.forces = [];
    let gravity = new ParticleForceDirectional();
    this.forces.push(gravity);
    this.clock = new Clock();
  }

  update() {
    this.clock.update();

    //emit particles
    for (let emitter of this.emitters) {
      emitter.update(this);
    }
  }
}
