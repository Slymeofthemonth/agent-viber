import React from "react";
import { AbsoluteFill } from "remotion";
import type { AnimationProps } from "../types";
import { Avatar } from "../components/Avatar";
import { Monitor, Keyboard } from "../components/Monitor";

export const TypingCode: React.FC<AnimationProps> = ({ avatarUrl, mood }) => {
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "30px 40px",
      }}
    >
      {/* Monitor on the LEFT */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Monitor />
      </div>
      
      {/* Keyboard in the MIDDLE, rotated 45 degrees */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        marginTop: 40,
      }}>
        <Keyboard />
      </div>
      
      {/* Avatar on the RIGHT */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar url={avatarUrl} mood={mood} />
      </div>
    </AbsoluteFill>
  );
};
