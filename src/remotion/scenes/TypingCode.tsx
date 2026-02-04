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
      {/* Monitor in TOP-LEFT (scaled down) */}
      <div style={{ 
        position: "absolute",
        top: 25,
        left: 25,
        transform: "scale(0.8)",
        transformOrigin: "top left",
      }}>
        <Monitor />
      </div>
      
      {/* Keyboard in CENTER, tilted (scaled down) */}
      <div style={{ 
        position: "absolute",
        top: "55%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(0.75)",
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
