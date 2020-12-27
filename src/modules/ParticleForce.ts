import Particle from "./Particle";
import Vector2 from "./Vector2";
import { fit_range } from "./Utils";
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

export class ParticleForcePoint extends ParticleForceBase {
  position: Vector2 = new Vector2();
  power: number = 1.0;
  constructor() {
    super();
  }

  update(p: Particle): Vector2 {
    let dist = this.position.clone().subtract(new Vector2(p.position.x, p.position.y)).mag();
    // console.log(dist);
    let effect = fit_range(dist, 0, 500, 0, 1);
    p.velocity.add(
      this.position
        .clone()
        .subtract(new Vector2(p.position.x, p.position.y))
        .multScalar((50 * 1) / (dist * dist))
        .multScalar(-1 * this.power)
    );

    return p.velocity;
  }
}
