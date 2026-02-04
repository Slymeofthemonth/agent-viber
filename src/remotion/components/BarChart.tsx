import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";

const DATA = [
  { label: "A", value: 0.8, color: "#4ade80" },
  { label: "B", value: 0.6, color: "#60a5fa" },
  { label: "C", value: 0.9, color: "#f472b6" },
  { label: "D", value: 0.5, color: "#facc15" },
];

export const BarChart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 12,
        height: 160,
        padding: 16,
        backgroundColor: "rgba(255,255,255,0.05)",
        borderRadius: 8,
      }}
    >
      {DATA.map((bar, i) => {
        const delay = i * 8;
        const progress = spring({
          frame: frame - delay,
          fps,
          config: { damping: 12, stiffness: 100 },
        });
        
        const height = bar.value * 120 * Math.min(progress, 1);
        
        return (
          <div key={bar.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div
              style={{
                width: 40,
                height,
                backgroundColor: bar.color,
                borderRadius: 4,
                boxShadow: `0 0 20px ${bar.color}40`,
              }}
            />
            <span style={{ color: "#fff", fontSize: 12, fontFamily: "system-ui" }}>
              {bar.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
