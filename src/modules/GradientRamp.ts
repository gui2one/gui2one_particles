import { fit_range, clamp, lerp } from "./Utils";

export default class GradientRampBase {
  protected keys: GradientKeyBase[];
  constructor() {}

  getValueAt(pos: number): any {
    pos = clamp(pos, 0, 1);

    let keys_before = this.keys.filter((value) => value.pos <= pos);
    let keys_after = this.keys.filter((value) => value.pos > pos);

    let key1 = keys_before[keys_before.length - 1];
    let key2 = keys_after[0];

    if (key2 === undefined) {
      key2 = key1;
    }

    //get pos relative to key1 and key2
    let pos_interp = fit_range(pos - key1.pos, 0, key2.pos - key1.pos, 0, 1);
    if (this instanceof FloatGradientRamp) {
      let interp = lerp(pos_interp, key1.value, key2.value);
      return interp;
    } else if (this instanceof ColorGradientRamp) {
      let interp_r = lerp(pos_interp, key1.value.r, key2.value.r);
      let interp_g = lerp(pos_interp, key1.value.g, key2.value.g);
      let interp_b = lerp(pos_interp, key1.value.b, key2.value.b);
      let interp_a = lerp(pos_interp, key1.value.a, key2.value.a);

      return { r: interp_r, g: interp_g, b: interp_b, a: interp_a };
    }
  }

  sortKeys() {
    // sort keys by pos
    this.keys = this.keys.sort((a, b) => a.pos - b.pos);
  }
  addKey(pos: number, value: any) {
    if (this instanceof FloatGradientRamp) {
      let key = new FloatGradientKey();
      key.pos = pos;
      key.value = value;
      this.keys.push(key);
    } else if (this instanceof ColorGradientRamp) {
      let key = new ColorGradientKey();
      key.pos = pos;
      key.value = value;
      this.keys.push(key);
    }

    this.sortKeys();
  }

  setKeyValue(index: number, value: number) {
    this.keys[index].value = value;
  }

  presets = {
    rampUp: () => {
      console.log("ramp up !!!");
      if (this instanceof FloatGradientRamp) {
        this.keys = [];
        this.addKey(0.0, 0.0);
        this.addKey(1.0, 1.0);
      }
    },
    rampDown: () => {
      console.log("ramp up !!!");
      if (this instanceof FloatGradientRamp) {
        this.keys = [];
        this.addKey(0.0, 1.0);
        this.addKey(1.0, 0.0);
      }
    },
  };
}

export class FloatGradientRamp extends GradientRampBase {
  constructor() {
    super();
    this.keys = Array<FloatGradientKey>();

    const key_start = new FloatGradientKey();
    key_start.pos = 0.0;
    key_start.value = 0.0;
    this.keys.push(key_start);

    const key_end = new FloatGradientKey();
    key_end.pos = 1.0;
    key_end.value = 1.0;
    this.keys.push(key_end);

    this.sortKeys();
  }
}
export class ColorGradientRamp extends GradientRampBase {
  constructor() {
    super();
    this.keys = Array<ColorGradientKey>();

    const key_start = new ColorGradientKey();
    key_start.pos = 0.0;
    key_start.value = { r: 1, g: 1, b: 0, a: 1 };
    this.keys.push(key_start);

    const key_end = new ColorGradientKey();
    key_end.pos = 1.0;
    key_end.value = { r: 1, g: 0, b: 1, a: 1 };
    this.keys.push(key_end);

    this.sortKeys();
  }
}

export class GradientKeyBase {
  pos: number;
  value: any;
  constructor() {}
}

export class FloatGradientKey extends GradientKeyBase {
  value: number;
  constructor() {
    super();
    this.value = 0.0;
  }
}

export class ColorGradientKey extends GradientKeyBase {
  value: { r: number; g: number; b: number; a: number };
  constructor() {
    super();
  }
}
