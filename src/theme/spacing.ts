export const spacing = {
  s8: 8,
  s12: 12,
  s16: 16,
  s24: 24,
  s32: 32,
  s40: 40,
} as const;

export type SpacingKey = keyof typeof spacing;

