import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import type { AnimationProps } from "../types";
import { Avatar } from "../components/Avatar";
import { SearchResult } from "../components/SearchResult";
import { MagnifyingGlass } from "../components/Icons";

export const Searching: React.FC<AnimationProps> = ({ avatarUrl, mood }) => {
  const frame = useCurrentFrame();
  
  // Magnifying glass sweep
  const sweepAngle = interpolate(frame, [0, 60], [0, 360], { extrapolateRight: "clamp" });
  const sweepScale = interpolate(frame, [0, 30, 60], [0.5, 1, 0.8]);
  
  // Avatar lean
  const leanX = interpolate(frame, [0, 40, 100, 150], [0, 15, 15, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        padding: 30,
      }}
    >
      {/* Magnifying glass icon (SVG) */}
      <div
        style={{
          position: "absolute",
          left: 50,
          top: 80,
          transform: `rotate(${sweepAngle}deg) scale(${sweepScale})`,
          opacity: interpolate(frame, [0, 20, 60, 80], [0, 1, 1, 0]),
        }}
      >
        <MagnifyingGlass size={60} />
      </div>
      
      {/* Avatar with lean */}
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 180,
          transform: `translateX(${leanX}px)`,
        }}
      >
        <Avatar url={avatarUrl} mood={mood} />
      </div>
      
      {/* Search results sliding in */}
      <SearchResult delay={50} title="Result 1: API docs" y={120} />
      <SearchResult delay={70} title="Result 2: Examples" y={200} />
      <SearchResult delay={90} title="Result 3: Tutorial" y={280} />
      <SearchResult delay={110} title="Result 4: Source" y={360} />
    </AbsoluteFill>
  );
};
