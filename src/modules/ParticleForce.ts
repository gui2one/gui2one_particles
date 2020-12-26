import Particle from "./Particle";
import Vector2 from "./Vector2";

export default class ParticleForceBase {
  constructor() {}

  update(p: Particle): Vector2 {
    return null;
  }
}

export class ParticleForceDirectional extends ParticleForceBase {
  protected direction: Vector2;
  treat_as_wind: boolean;
  dir_normalized: Vector2;
  constructor() {
    super();
    this.setDirection(new Vector2(0, 60));
    this.dir_normalized = this.direction.clone().normalize();
    this.treat_as_wind = true;
  }

  setDirection(dir: Vector2) {
    this.direction = dir;
    this.dir_normalized = dir.clone().normalize();
  }
  update(p: Particle): Vector2 {
    if (this.treat_as_wind) {
      let f = this.direction.clone().subtract(p.velocity);

      // console.log(delta);

      p.velocity.add(f.multScalar(0.001 * (1.0 / (p.mass * p.mass))).mult(this.dir_normalized));
    } else {
      p.velocity.add(this.direction);
    }
    // console.log(vel.y);

    return p.velocity;
  }
}
