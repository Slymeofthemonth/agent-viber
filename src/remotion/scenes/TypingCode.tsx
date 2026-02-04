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
        position: "relative",
      }}
    >
      {/* Monitor in TOP-LEFT */}
      <div style={{ 
        position: "absolute",
        top: 30,
        left: 30,
      }}>
        <Monitor />
      </div>
      
      {/* Keyboard in CENTER, tilted */}
      <div style={{ 
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}>
        <Keyboard />
      </div>
      
      {/* Avatar in BOTTOM-RIGHT */}
      <div style={{ 
        position: "absolute",
        bottom: 30,
        right: 40,
      }}>
        <Avatar url={avatarUrl} mood={mood} />
      </div>
    </AbsoluteFill>
  );
};
