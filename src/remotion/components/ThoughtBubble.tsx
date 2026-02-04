import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

type Props = {
  delay: number;
  x: number;
  y: number;
  children: React.ReactNode;
};

export const ThoughtBubble: React.FC<Props> = ({ delay, x, y, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  
  const scale = Math.min(progress, 1);
  const opacity = interpolate(progress, [0, 0.5, 1], [0, 1, 1]);
  const floatY = Math.sin((frame - delay) * 0.05) * 5;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + floatY,
        transform: `scale(${scale})`,
        opacity,
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 20,
        padding: "8px 16px",
        border: "1px solid rgba(255,255,255,0.2)",
        color: "#fff",
        fontSize: 20,
        fontFamily: "system-ui",
      }}
    >
      {children}
    </div>
  );
};
