import Vector2 from "./Vector2";
import * as PIXI from "pixi.js";
export default class Particle extends PIXI.Sprite {
  //   position: Vector2;
  velocity: Vector2;
  mass: number;
  life: number;
  age: number;
  dead: boolean;
  rotate_clockwise: boolean;
  rotation_speed: number = 1.0;
  constructor() {
    super();
    // this.position = new Vector2();
    this.velocity = new Vector2();
    this.mass = 1;
    this.scale.set(1);
    this.life = 20.0;
    this.age = 0;
    this.rotate_clockwise = true;
    this.dead = false;
  }
}
