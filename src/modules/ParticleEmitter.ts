import Particle from "./Particle";
import ParticleSystem from "./ParticleSystem";
import Vector2 from "./Vector2";
import * as PIXI from "pixi.js";
import { fit_range, clamp } from "./Utils";

export default class ParticleEmitter {
  position: Vector2;
  particles: Particle[];
  amount_per_second: number;
  limit_num: number = 5000;

  emit_vel: Vector2;
  rand_vel_amount: number = 20.0;

  emit_interval: any;
  pixi_container: PIXI.Container;
  textures: PIXI.Texture[];

  constructor() {
    this.pixi_container = new PIXI.Container();
    // this.pixi_container.autoResize = true;

    this.textures = [];

    var img = new Image();
    img.src = "snowflake.png";
    var base = new PIXI.BaseTexture(img);

    this.textures.push(new PIXI.Texture(base)); // return you the texture

    this.particles = [];
    this.emit_vel = new Vector2(0.0, 0.0);
    this.position = new Vector2();
    this.amount_per_second = 200;

    // this.startEmission();
    // console.log("Particle Emitter Constructor");
  }

  emitParticles(num: number) {
    console.warn("emit method is Not implemented");
  }

  startEmission() {
    if (this.emit_interval === undefined) {
      this.emit_interval = setInterval(() => {
        this.emitParticles(1);
      }, 1000 / this.amount_per_second);
    }
  }

  stopEmission() {
    clearInterval(this.emit_interval);
    this.emit_interval = undefined;
  }

  update(ps: ParticleSystem) {
    let forces = ps.forces;

    // this.emit(1);
    this.particles = this.particles.filter((value) => {
      return value.dead == false;
    });
    if (this.particles.length > this.limit_num) {
      this.particles.splice(this.particles.length - this.limit_num - 2, this.particles.length - this.limit_num);
      // this.particles.splice(0, this.limit_num);
    }

    const delta_time = ps.clock.getDeltaTime();
    for (let p of this.particles) {
      let vel = p.velocity.clone();
      vel.multScalar(delta_time);
      p.age += delta_time;

      p.scale.set(fit_range(p.age, 0, p.life, 0.1, 0.02));
      p.alpha = fit_range(p.age, 0, p.life, 1.0, 0.0);
      if (p.age > p.life) p.dead = true;
      p.position.set(p.position.x + vel.x, p.position.y + vel.y);
    }
  }
}

export class LineEmitter extends ParticleEmitter {
  width: number;

  emitParticles(num: number) {
    for (let i = 0; i < num; i++) {
      // const p = <Particle>PIXI.Sprite.from("snowflake.png"); // as Particle;
      const p = new Particle();
      p.anchor.set(0.5);
      p.scale.set(0.04);
      p.tint = 0xffffff;
      this.rand_vel_amount;
      let new_vel = this.emit_vel.clone();
      let rand_vel = new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1);
      rand_vel.normalize();
      rand_vel.multScalar(this.rand_vel_amount * Math.random());

      new_vel.add(rand_vel);

      p.velocity = new_vel;
      let emitter_pos = this.position.clone();

      p.position.set(emitter_pos.x, emitter_pos.y);
      p.texture = this.textures[0];
      this.particles.push(p);
    }

    this.pixi_container.removeChildren();
    for (let p of this.particles) {
      this.pixi_container.addChild(p);
    }
  }
}
