import Vector2 from "./Vector2";
import * as PIXI from "pixi.js";
export default class Particle extends PIXI.Sprite {
  //   position: Vector2;
  velocity: Vector2;
  mass: number;
  life: number;
  age: number;
  dead: boolean;

  constructor() {
    super();
    // this.position = new Vector2();
    this.velocity = new Vector2();
    this.mass = 1;
    this.scale.set(10);
    this.life = 20.0;
    this.age = 0;

    this.dead = false;
  }
}
