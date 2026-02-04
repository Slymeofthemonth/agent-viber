import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import type { AnimationProps } from "../types";
import { Avatar } from "../components/Avatar";
import { ScribbleBubble } from "../components/ScribbleBubble";

export const Thinking: React.FC<AnimationProps> = ({ avatarUrl, mood }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  
  // Warm glow intensity builds up over time
  const glowIntensity = interpolate(
    frame,
    [0, durationInFrames * 0.7, durationInFrames],
    [0.3, 0.8, 1],
    { extrapolateRight: "clamp" }
  );
  
  // Glow radius expands
  const glowRadius = interpolate(
    frame,
    [0, durationInFrames],
    [100, 250],
    { extrapolateRight: "clamp" }
  );
  
  // Floating effect for avatar
  const floatY = Math.sin(frame * 0.03) * 8;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Warm glow emanating from top */}
      <div
        style={{
          position: "absolute",
          top: -50,
          left: "50%",
          transform: "translateX(-50%)",
          width: glowRadius * 2,
          height: glowRadius * 1.5,
          background: `radial-gradient(ellipse at center, 
            rgba(255, 200, 100, ${glowIntensity * 0.6}) 0%,
            rgba(255, 150, 50, ${glowIntensity * 0.4}) 30%,
            rgba(255, 100, 50, ${glowIntensity * 0.2}) 60%,
            transparent 100%
          )`,
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />
      
      {/* Secondary warm glow (softer, wider) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: glowRadius * 3,
          height: glowRadius * 2,
          background: `radial-gradient(ellipse at center top, 
            rgba(255, 180, 80, ${glowIntensity * 0.3}) 0%,
            transparent 70%
          )`,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      
      {/* Thought bubble positioned above avatar */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: "50%",
          transform: "translateX(-30%)",
        }}
      >
        <ScribbleBubble />
      </div>
      
      {/* Avatar centered with float */}
      <div 
        style={{ 
          transform: `translateY(${floatY + 40}px)`,
          position: "relative",
        }}
      >
        {/* Subtle glow around avatar when thinking intensifies */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 200,
            height: 200,
            background: `radial-gradient(circle, 
              rgba(255, 200, 100, ${glowIntensity * 0.15}) 0%,
              transparent 70%
            )`,
            filter: "blur(15px)",
            pointerEvents: "none",
          }}
        />
        <Avatar url={avatarUrl} mood={mood} />
      </div>
    </AbsoluteFill>
  );
};
