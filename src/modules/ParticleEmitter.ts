import Particle from "./Particle";
import ParticleSystem from "./ParticleSystem";
import Vector2 from "./Vector2";
import * as PIXI from "pixi.js";
import { fit_range, clamp } from "./Utils";
import { ColorGradientRamp, FloatGradientKey, FloatGradientRamp } from "./GradientRamp";

export default class ParticleEmitter {
  position: Vector2;
  particles: Particle[];
  amount_per_second: number;
  limit_num: number = 2000;

  emit_vel: Vector2;
  rand_vel_amount: number = 10.0;

  emit_interval: any;
  pixi_container: PIXI.Container;
  textures: PIXI.Texture[];

  scale_over_life: FloatGradientRamp;
  color_over_life: ColorGradientRamp;

  constructor() {
    this.pixi_container = new PIXI.Container();
    // this.pixi_container.autoResize = true;

    this.textures = [];

    var img = new Image();
    img.src = "snowflake_small.png";
    var base = new PIXI.BaseTexture(img);

    this.textures.push(new PIXI.Texture(base)); // return you the texture

    this.particles = [];
    this.emit_vel = new Vector2(0.0, 0.0);
    this.position = new Vector2();
    this.amount_per_second = 10;

    this.scale_over_life = new FloatGradientRamp();

    this.scale_over_life.setKeyValue(0, 1.0);
    this.scale_over_life.setKeyValue(1, 1.0);
    // this.scale_over_life.addKey(0.5, 1.5);
    console.log("interpolation : ", this.scale_over_life.getValueAt(0.5));

    // this.scale_over_life.presets.rampDown();
    this.color_over_life = new ColorGradientRamp();
    // this.color_over_life.getValueAt(0.5);
  }

  emitParticlesBase(num: number) {
    this.setNewParticlesPos(num);
    for (let i = 0; i < num; i++) {
      // const p = <Particle>PIXI.Sprite.from("snowflake.png"); // as Particle;
      let p = this.particles[this.particles.length - 1 - i];
      p.anchor.set(0.5);
      p.scale.set(fit_range(Math.random(), 0, 1, 0.2, 0.08));
      p.mass = fit_range(Math.random(), 0, 1, 0.1, 1.0);
      p.tint = 0xff0000;

      this.rand_vel_amount;
      let new_vel = this.emit_vel.clone();
      let rand_vel = new Vector2(Math.random() * 2 - 1, Math.random() * 2 - 1);
      rand_vel.normalize();
      rand_vel.multScalar(this.rand_vel_amount * Math.random());

      new_vel.add(rand_vel);

      p.velocity = new_vel;
      let emitter_pos = this.position.clone();

      p.rotation_speed = Math.random();
      p.rotate_clockwise = Math.random() > 0.5;
      p.life = 15.0;
      p.texture = this.textures[0];
    }

    this.pixi_container.removeChildren();
    for (let p of this.particles) {
      this.pixi_container.addChild(p);
    }
  }
  emitParticles(num: number) {
    console.warn("emit method is Not implemented");
  }

  setNewParticlesPos(num: number) {}

  startEmission() {
    if (this.emit_interval === undefined) {
      this.emit_interval = setInterval(() => {
        this.emitParticlesBase(1);
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
      // velocity
      let vel = p.velocity.clone();
      for (let force of forces) {
        vel = force.update(p);
        // vel.multScalar(delta_time);
      }

      // vel.multScalar(delta_time);
      p.velocity = vel;

      //age
      p.age += delta_time;

      // rotation
      p.rotation += delta_time * p.rotation_speed * (p.rotate_clockwise ? 1 : -1);
      let scale_now = this.scale_over_life.getValueAt(clamp(p.age / p.life, 0, 1));
      // let scale = fit_range(p.age, 0, p.life, 0.1, 0.02);
      p.scale.set(p.scale.x * scale_now, p.scale.y * scale_now);

      let clr = this.color_over_life.getValueAt(p.age / p.life);
      clr.r = Math.round(clr.r * 255);
      clr.g = Math.round(clr.g * 255);
      clr.b = Math.round(clr.b * 255);
      p.tint = (clr.r << 16) + (clr.g << 8) + (clr.b << 0);
      // console.log(p.tint);

      p.alpha = fit_range(p.age, 0, p.life, 1.0, 0.0);
      if (p.age > p.life) p.dead = true;
      p.position.set(p.position.x + vel.x * delta_time, p.position.y + vel.y * delta_time);
    }
  }
}

export class LineEmitter extends ParticleEmitter {
  width: number;
  direction: Vector2;
  constructor() {
    super();
    this.direction = new Vector2(1, 0);
    this.width = 150;
  }
  setNewParticlesPos(num: number) {
    // console.log("setting particles position");
    for (let i = 0; i < num; i++) {
      const p = new Particle();

      let rand_val = Math.random();

      let p_pos = this.position.clone();
      let dir_c = this.direction.clone();
      p_pos.add(dir_c.multScalar(rand_val * this.width));

      p.position.set(p_pos.x, p_pos.y);
      this.particles.push(p);
    }
  }
}
