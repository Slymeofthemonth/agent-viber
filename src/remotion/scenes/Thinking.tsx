import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";
import type { AnimationProps } from "../types";
import { Avatar } from "../components/Avatar";
import { ThoughtBubble } from "../components/ThoughtBubble";

export const Thinking: React.FC<AnimationProps> = ({ avatarUrl, mood }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Lightbulb appears at the end
  const lightbulbProgress = spring({
    frame: frame - 100,
    fps,
    config: { damping: 10, stiffness: 100 },
  });
  
  // Floating effect for avatar
  const floatY = Math.sin(frame * 0.03) * 8;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Thought bubbles */}
      <ThoughtBubble delay={20} x={80} y={100}>🤔</ThoughtBubble>
      <ThoughtBubble delay={40} x={350} y={80}>💭</ThoughtBubble>
      <ThoughtBubble delay={60} x={100} y={320}>⚡</ThoughtBubble>
      <ThoughtBubble delay={80} x={360} y={350}>🧠</ThoughtBubble>
      
      {/* Lightbulb moment */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 220,
          fontSize: 60,
          transform: `scale(${Math.min(lightbulbProgress, 1)})`,
          opacity: lightbulbProgress,
          filter: `drop-shadow(0 0 20px #facc15)`,
        }}
      >
        💡
      </div>
      
      {/* Avatar centered with float */}
      <div style={{ transform: `translateY(${floatY}px)` }}>
        <Avatar url={avatarUrl} mood={mood} />
      </div>
    </AbsoluteFill>
  );
};
