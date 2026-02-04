import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const ScribbleBubble: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  
  // Bubble appears with spring
  const bubbleProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  
  // Scribble paths that get revealed over time
  const scribbles = [
    { d: "M20,30 Q30,20 40,30 T60,30", delay: 30, color: "#666" },
    { d: "M25,45 L55,45", delay: 45, color: "#777" },
    { d: "M30,55 Q40,50 50,55 Q60,60 70,55", delay: 55, color: "#666" },
    { d: "M20,70 L40,70 L40,85 L60,85", delay: 70, color: "#555" },
    { d: "M50,40 C55,35 65,35 70,40", delay: 85, color: "#777" },
    { d: "M25,90 Q35,95 45,90 Q55,85 65,90", delay: 95, color: "#666" },
  ];
  
  // Lightbulb moment near the end
  const lightbulbFrame = durationInFrames - 40;
  const lightbulbProgress = spring({
    frame: frame - lightbulbFrame,
    fps,
    config: { damping: 8, stiffness: 100 },
  });
  
  return (
    <div
      style={{
        position: "relative",
        transform: `scale(${Math.min(bubbleProgress, 1)})`,
        opacity: bubbleProgress,
      }}
    >
      {/* Main thought bubble */}
      <div
        style={{
          width: 120,
          height: 110,
          background: "rgba(255,255,255,0.95)",
          borderRadius: "50% 50% 50% 20%",
          position: "relative",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          overflow: "hidden",
        }}
      >
        {/* Scribbles inside bubble */}
        <svg
          width="120"
          height="110"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {scribbles.map((scribble, i) => {
            const pathProgress = interpolate(
              frame - scribble.delay,
              [0, 20],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            
            return (
              <path
                key={i}
                d={scribble.d}
                fill="none"
                stroke={scribble.color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="100"
                strokeDashoffset={100 - pathProgress * 100}
                style={{ opacity: pathProgress }}
              />
            );
          })}
        </svg>
        
        {/* Lightbulb appears at the end */}
        {frame > lightbulbFrame && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) scale(${Math.min(lightbulbProgress, 1)})`,
              fontSize: 40,
              filter: `drop-shadow(0 0 ${10 + lightbulbProgress * 15}px #facc15)`,
            }}
          >
            💡
          </div>
        )}
      </div>
      
      {/* Bubble tail dots */}
      <div
        style={{
          position: "absolute",
          bottom: -15,
          left: 10,
          width: 16,
          height: 16,
          background: "rgba(255,255,255,0.9)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -28,
          left: 0,
          width: 10,
          height: 10,
          background: "rgba(255,255,255,0.85)",
          borderRadius: "50%",
        }}
      />
    </div>
  );
};
