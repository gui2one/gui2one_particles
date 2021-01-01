import Clock from "./Clock";
import ParticleEmitter, { LineEmitter, TextureEmitter } from "./ParticleEmitter";
import ParticleForceBase, { ParticleForceDirectional, ParticleForcePoint, ParticleForceNoise } from "./ParticleForce";
import { AdvancedBloomFilter } from "@pixi/filter-advanced-bloom";

import Vector2 from "./Vector2";
import * as PIXI from "pixi.js";

import { fit_range } from "./Utils";
export default class ParticleSystem {
  emitters: ParticleEmitter[];
  forces: Array<ParticleForceBase>;
  clock: Clock;
  renderer: PIXI.Renderer;
  constructor(renderer: PIXI.Renderer) {
    this.renderer = renderer;
    this.emitters = Array<ParticleEmitter>();

    this.forces = [];

    this.clock = new Clock();
  }

  update() {
    this.clock.update();

    for (let emitter of this.emitters) {
      emitter.update(this);
    }
  }
}

window.PIXI = PIXI;
window.Vector2 = Vector2;
window.ParticleSystem = ParticleSystem;
window.LineEmitter = LineEmitter;
window.TextureEmitter = TextureEmitter;
window.ParticleForceDirectional = ParticleForceDirectional;
window.ParticleForcePoint = ParticleForcePoint;
window.ParticleForceNoise = ParticleForceNoise;
window.AdvancedBloomFilter = AdvancedBloomFilter;
