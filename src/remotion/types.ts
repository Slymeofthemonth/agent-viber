export type Scene = 
  | "TYPING_CODE"
  | "ANALYZING_DATA"
  | "THINKING"
  | "SEARCHING"
  | "CONNECTING";

export type Mood = "calm" | "excited" | "focused" | "glitchy";

export type AnimationProps = {
  scene: Scene;
  avatarUrl: string;
  mood: Mood;
};

export const COMPOSITION_WIDTH = 512;
export const COMPOSITION_HEIGHT = 512;
export const COMPOSITION_FPS = 30;
export const COMPOSITION_DURATION_SECONDS = 5;
export const COMPOSITION_DURATION_FRAMES = COMPOSITION_FPS * COMPOSITION_DURATION_SECONDS; // 150
