import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import type { AnimationProps } from "../types";
import { Avatar } from "../components/Avatar";
import { NetworkNode } from "../components/NetworkNode";

const NODES = [
  { x: 80, y: 100, label: "🌐", delay: 20 },
  { x: 420, y: 80, label: "📡", delay: 40 },
  { x: 450, y: 280, label: "💾", delay: 60 },
  { x: 400, y: 420, label: "🔗", delay: 80 },
  { x: 100, y: 400, label: "⚡", delay: 100 },
  { x: 50, y: 250, label: "🤖", delay: 120 },
];

const CENTER_X = 256;
const CENTER_Y = 256;

export const Connecting: React.FC<AnimationProps> = ({ avatarUrl, mood }) => {
  const frame = useCurrentFrame();
  
  // Pulse effect for center
  const centerPulse = 1 + Math.sin(frame * 0.08) * 0.03;
  const glowIntensity = interpolate(frame, [0, 150], [10, 30]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 100%)",
      }}
    >
      {/* Network nodes */}
      {NODES.map((node, i) => (
        <NetworkNode
          key={i}
          delay={node.delay}
          x={node.x}
          y={node.y}
          label={node.label}
          centerX={CENTER_X}
          centerY={CENTER_Y}
        />
      ))}
      
      {/* Center avatar with glow */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X - 90,
          top: CENTER_Y - 90,
          transform: `scale(${centerPulse})`,
          filter: `drop-shadow(0 0 ${glowIntensity}px rgba(96, 165, 250, 0.5))`,
        }}
      >
        <Avatar url={avatarUrl} mood={mood} />
      </div>
    </AbsoluteFill>
  );
};
