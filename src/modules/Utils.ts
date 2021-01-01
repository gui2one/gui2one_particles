export const fit_range = (src, src_min, src_max, dst_min, dst_max): number => {
  src = clamp(src, src_min, src_max);
  return ((src - src_min) / (src_max - src_min)) * (dst_max - dst_min) + dst_min;
};

export const clamp = (src, min, max): number => {
  if (src < min) return min;
  else if (src > max) return max;
  else return src;
};

export const min = (val1: number, val2: number): number => {
  if (val1 < val2) return val1;
  else return val2;
};

export const max = (val1: number, val2: number): number => {
  if (val1 > val2) return val1;
  else return val2;
};

export const lerp = (ratio, value1, value2): number => {
  return (value2 - value1) * clamp(ratio, 0, 1) + value1;
};

export const smoothStep = (ratio: number) => {
  return ratio * ratio * (1 - ratio / 1.5) * 3;
};
export const slerp = (ratio: number, value1: number, value2: number) => {
  return fit_range(smoothStep(ratio), 0, 1, value1, value2);
};

export const interpolate = (type: string, ratio: number, value1: number, value2: number): number => {
  let ret = 0;
  switch (type) {
    case "linear":
      ret = lerp(ratio, value1, value2);
      break;
    case "smoothStep":
      ret = slerp(ratio, value1, value2);
      break;
    default:
      break;
  }

  return ret;
};
