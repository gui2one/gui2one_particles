import Clock from "./Clock";
import ParticleEmitter, { LineEmitter } from "./ParticleEmitter";
import ParticleForceBase, { ParticleForceDirectional, ParticleForcePoint } from "./ParticleForce";
import { AdvancedBloomFilter } from "@pixi/filter-advanced-bloom";

import Vector2 from "./Vector2";
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

window.PIXI = PIXI;
window.Vector2 = Vector2;
window.ParticleSystem = ParticleSystem;
window.LineEmitter = LineEmitter;
window.ParticleForceDirectional = ParticleForceDirectional;
window.ParticleForcePoint = ParticleForcePoint;
window.AdvancedBloomFilter = AdvancedBloomFilter;
