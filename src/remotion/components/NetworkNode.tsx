import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { NetworkIcon } from "./Icons";

type Props = {
  delay: number;
  x: number;
  y: number;
  iconType: string;
  centerX: number;
  centerY: number;
};

export const NetworkNode: React.FC<Props> = ({ delay, x, y, iconType, centerX, centerY }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  
  const scale = Math.min(progress, 1);
  const lineProgress = interpolate(progress, [0, 1], [0, 1], { extrapolateRight: "clamp" });
  
  // Pulse effect
  const pulse = 1 + Math.sin((frame - delay) * 0.1) * 0.05;

  return (
    <>
      {/* Connection line */}
      <svg
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 512,
          height: 512,
          pointerEvents: "none",
        }}
      >
        <line
          x1={centerX}
          y1={centerY}
          x2={centerX + (x - centerX) * lineProgress}
          y2={centerY + (y - centerY) * lineProgress}
          stroke="#60a5fa"
          strokeWidth={2}
          opacity={0.5}
        />
      </svg>
      
      {/* Node */}
      <div
        style={{
          position: "absolute",
          left: x - 25,
          top: y - 25,
          width: 50,
          height: 50,
          borderRadius: "50%",
          backgroundColor: "rgba(96, 165, 250, 0.2)",
          border: "2px solid #60a5fa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${scale * pulse})`,
          opacity: scale,
          boxShadow: "0 0 20px rgba(96, 165, 250, 0.4)",
        }}
      >
        <NetworkIcon type={iconType} size={28} />
      </div>
    </>
  );
};
