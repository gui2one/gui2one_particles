import * as PIXI from "pixi.js";

export default class Vector2 {
  x: number;
  y: number;
  constructor(x: number = 0.0, y: number = 0.0) {
    // super(x, y);
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Vector2(this.x, this.y);
  }

  add(vec: Vector2) {
    this.x += vec.x;
    this.y += vec.y;
  }

  mult(vec: Vector2) {
    this.x *= vec.x;
    this.y *= vec.y;
  }

  multScalar(mult: number) {
    this.x *= mult;
    this.y *= mult;
  }

  mag(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  magSquared(): number {
    return this.x * this.x + this.y * this.y;
  }

  normalize() {
    let mag = this.mag();
    this.x /= mag;
    this.y /= mag;
  }
}
