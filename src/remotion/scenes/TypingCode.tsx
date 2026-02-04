import React from "react";
import { AbsoluteFill } from "remotion";
import type { AnimationProps } from "../types";
import { Avatar } from "../components/Avatar";
import { Monitor } from "../components/Monitor";

export const TypingCode: React.FC<AnimationProps> = ({ avatarUrl, mood }) => {
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
        padding: 30,
      }}
    >
      {/* Avatar on the left */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar url={avatarUrl} mood={mood} />
      </div>
      
      {/* Monitor with keyboard on the right */}
      <Monitor />
    </AbsoluteFill>
  );
};
