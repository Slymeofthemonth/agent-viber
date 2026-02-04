import React from "react";
import { Img, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import type { Mood } from "../types";
import { MOOD_CONFIGS } from "../utils/moods";

type AvatarProps = {
  url: string;
  mood: Mood;
  baseY?: number;
  baseScale?: number;
};

export const Avatar: React.FC<AvatarProps> = ({ 
  url, 
  mood, 
  baseY = 0,
  baseScale = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const config = MOOD_CONFIGS[mood];
  
  // Adjust frame by speed multiplier
  const adjustedFrame = frame * config.speed;
  
  // Looping bob animation (one cycle per second)
  const cycleFrames = fps / config.speed;
  const bobY = interpolate(
    adjustedFrame % cycleFrames,
    [0, cycleFrames / 2, cycleFrames],
    [0, -config.bobAmount, 0],
    { extrapolateRight: "clamp" }
  );
  
  // Subtle scale pulse
  const scale = interpolate(
    adjustedFrame % cycleFrames,
    [0, cycleFrames / 2, cycleFrames],
    [baseScale, baseScale + config.scaleRange, baseScale],
    { extrapolateRight: "clamp" }
  );
  
  // Gentle rotation
  const rotate = interpolate(
    adjustedFrame % (cycleFrames * 2),
    [0, cycleFrames, cycleFrames * 2],
    [-config.rotateRange, config.rotateRange, -config.rotateRange],
    { extrapolateRight: "clamp" }
  );
  
  // Glitchy mode adds random jitter
  const jitterX = mood === "glitchy" 
    ? (Math.sin(frame * 0.7) * 3) + (Math.cos(frame * 1.3) * 2)
    : 0;
  const jitterY = mood === "glitchy"
    ? (Math.cos(frame * 0.9) * 3) + (Math.sin(frame * 1.1) * 2)
    : 0;

  return (
    <Img
      src={url}
      style={{
        width: 180,
        height: 180,
        objectFit: "contain",
        transform: `
          translateY(${baseY + bobY + jitterY}px)
          translateX(${jitterX}px)
          scale(${scale})
          rotate(${rotate}deg)
        `,
        filter: mood === "glitchy" 
          ? `hue-rotate(${(frame * 10) % 360}deg)` 
          : undefined,
      }}
    />
  );
};
