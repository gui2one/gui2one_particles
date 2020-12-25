import Clock from "./Clock";
import ParticleEmitter, { LineEmitter } from "./ParticleEmitter";
import ParticleForce from "./ParticleForce";

import * as PIXI from "pixi.js";

import { fit_range } from "./Utils";
export default class ParticleSystem {
  emitters: ParticleEmitter[];
  forces: Array<ParticleForce>;
  clock: Clock;
  constructor() {
    // super();
    // this.autoResize = true;
    this.emitters = Array<ParticleEmitter>();
    this.emitters.push(new LineEmitter());

    // this.emitters[0].position.x = 250;
    // this.emitters[0].position.y = 100;
    this.forces = [];
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
