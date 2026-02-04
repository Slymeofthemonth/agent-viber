import React from "react";
import { AbsoluteFill } from "remotion";
import type { AnimationProps } from "../types";
import { Avatar } from "../components/Avatar";
import { CodeEditor } from "../components/CodeEditor";

export const TypingCode: React.FC<AnimationProps> = ({ avatarUrl, mood }) => {
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 30,
      }}
    >
      {/* Avatar on the left */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar url={avatarUrl} mood={mood} />
      </div>
      
      {/* Code editor on the right */}
      <CodeEditor />
    </AbsoluteFill>
  );
};
