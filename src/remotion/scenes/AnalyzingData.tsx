import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import type { AnimationProps } from "../types";
import { Avatar } from "../components/Avatar";
import { BarChart } from "../components/BarChart";

export const AnalyzingData: React.FC<AnimationProps> = ({ avatarUrl, mood }) => {
  const frame = useCurrentFrame();
  
  // Floating numbers animation
  const numbers = ["+12%", "98.6", "▲ 24", "OK"];
  
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0c1222 0%, #1a1a3a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: 30,
      }}
    >
      {/* Floating data points */}
      {numbers.map((num, i) => {
        const angle = (i / numbers.length) * Math.PI * 2 + frame * 0.02;
        const radius = 180;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.3;
        const opacity = interpolate(frame, [0, 30], [0, 0.7], { extrapolateRight: "clamp" });
        
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 256 + x - 20,
              top: 200 + y,
              color: "#4ade80",
              fontSize: 14,
              fontFamily: "monospace",
              opacity,
            }}
          >
            {num}
          </div>
        );
      })}
      
      {/* Avatar centered above chart */}
      <Avatar url={avatarUrl} mood={mood} baseScale={0.9} />
      
      {/* Bar chart below */}
      <BarChart />
    </AbsoluteFill>
  );
};
