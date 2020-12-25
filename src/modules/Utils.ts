export const fit_range = (src, src_min, src_max, dst_min, dst_max): number => {
  src = clamp(src, src_min, src_max);
  return ((src - src_min) / (src_max - src_min)) * (dst_max - dst_min) + dst_min;
};

export const clamp = (src, min, max): number => {
  if (src < min) return min;
  else if (src > max) return max;
  else return src;
};
