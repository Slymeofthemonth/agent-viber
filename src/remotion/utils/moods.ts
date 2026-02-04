import type { Mood } from "../types";

export type MoodConfig = {
  speed: number;      // multiplier for animation speed
  amplitude: number;  // multiplier for movement range
  bobAmount: number;  // vertical bob in pixels
  scaleRange: number; // scale variation (e.g., 0.02 = 1.0 to 1.02)
  rotateRange: number; // rotation in degrees
};

export const MOOD_CONFIGS: Record<Mood, MoodConfig> = {
  calm: {
    speed: 0.5,
    amplitude: 0.6,
    bobAmount: 4,
    scaleRange: 0.01,
    rotateRange: 1,
  },
  excited: {
    speed: 1.5,
    amplitude: 1.4,
    bobAmount: 10,
    scaleRange: 0.04,
    rotateRange: 3,
  },
  focused: {
    speed: 0.7,
    amplitude: 0.4,
    bobAmount: 2,
    scaleRange: 0.02,
    rotateRange: 0.5,
  },
  glitchy: {
    speed: 2.0,
    amplitude: 1.0,
    bobAmount: 6,
    scaleRange: 0.03,
    rotateRange: 5,
  },
};
