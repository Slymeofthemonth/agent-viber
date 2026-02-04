import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";

type Props = {
  delay: number;
  title: string;
  y: number;
};

export const SearchResult: React.FC<Props> = ({ delay, title, y }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  
  const slideX = (1 - Math.min(progress, 1)) * 100;

  return (
    <div
      style={{
        position: "absolute",
        right: 30,
        top: y,
        transform: `translateX(${slideX}px)`,
        opacity: Math.min(progress, 1),
        backgroundColor: "rgba(255,255,255,0.08)",
        borderRadius: 8,
        padding: "10px 14px",
        width: 200,
        borderLeft: "3px solid #60a5fa",
      }}
    >
      <div style={{ color: "#60a5fa", fontSize: 12, fontFamily: "system-ui" }}>
        {title}
      </div>
      <div style={{ 
        color: "#888", 
        fontSize: 10, 
        marginTop: 4,
        fontFamily: "system-ui",
      }}>
        Found relevant match...
      </div>
    </div>
  );
};
