import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

// SVG Lightbulb component
const Lightbulb: React.FC<{ glow: number }> = ({ glow }) => (
  <svg width="50" height="65" viewBox="0 0 50 65">
    {/* Glow effect */}
    <defs>
      <radialGradient id="bulbGlow" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="#fff9c4" stopOpacity={glow} />
        <stop offset="50%" stopColor="#ffeb3b" stopOpacity={glow * 0.6} />
        <stop offset="100%" stopColor="#ffc107" stopOpacity="0" />
      </radialGradient>
      <filter id="blur">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>
    
    {/* Outer glow */}
    <ellipse cx="25" cy="25" rx={20 + glow * 8} ry={20 + glow * 8} fill="url(#bulbGlow)" filter="url(#blur)" />
    
    {/* Bulb glass */}
    <path
      d="M25 5 C12 5 5 15 5 25 C5 32 8 38 15 42 L15 48 L35 48 L35 42 C42 38 45 32 45 25 C45 15 38 5 25 5"
      fill="#fff9c4"
      stroke="#ffc107"
      strokeWidth="2"
    />
    
    {/* Bulb base/screw */}
    <rect x="15" y="48" width="20" height="4" fill="#9e9e9e" />
    <rect x="16" y="52" width="18" height="3" fill="#757575" />
    <rect x="17" y="55" width="16" height="3" fill="#9e9e9e" />
    <rect x="18" y="58" width="14" height="3" fill="#757575" />
    <path d="M20 61 L30 61 L28 64 L22 64 Z" fill="#616161" />
    
    {/* Filament */}
    <path
      d="M20 35 Q22 30 25 35 Q28 40 30 35"
      fill="none"
      stroke="#ff9800"
      strokeWidth="2"
      strokeLinecap="round"
    />
    
    {/* Inner glow when lit */}
    <ellipse cx="25" cy="28" rx="12" ry="15" fill={`rgba(255, 245, 157, ${glow * 0.5})`} />
  </svg>
);

export const ScribbleBubble: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  
  // Bubble appears with spring
  const bubbleProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  
  // Uniform wavy lines that fill the bubble space
  const lines = [
    { y: 22, delay: 30 },
    { y: 36, delay: 40 },
    { y: 50, delay: 50 },
    { y: 64, delay: 60 },
    { y: 78, delay: 70 },
    { y: 92, delay: 80 },
  ];
  
  // Lightbulb moment near the end
  const lightbulbFrame = durationInFrames - 45;
  const lightbulbProgress = spring({
    frame: frame - lightbulbFrame,
    fps,
    config: { damping: 10, stiffness: 80 },
  });
  
  // Generate consistent squiggle path
  const generateSquiggle = (y: number, width: number): string => {
    const amplitude = 3;
    const wavelength = 12;
    let path = `M 15 ${y}`;
    
    for (let x = 15; x <= width - 15; x += 3) {
      const wave = Math.sin((x / wavelength) * Math.PI * 2) * amplitude;
      path += ` L ${x} ${y + wave}`;
    }
    
    return path;
  };
  
  const showLightbulb = frame > lightbulbFrame;
  const lightbulbScale = Math.min(lightbulbProgress, 1);
  
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
          width: 130,
          height: 115,
          background: "rgba(255,255,255,0.95)",
          borderRadius: "50% 50% 50% 20%",
          position: "relative",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          overflow: "hidden",
        }}
      >
        {/* Squiggle lines inside bubble */}
        <svg
          width="130"
          height="115"
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0,
            opacity: showLightbulb ? 1 - lightbulbScale : 1,
            transition: "opacity 0.3s",
          }}
        >
          {lines.map((line, i) => {
            const pathProgress = interpolate(
              frame - line.delay,
              [0, 25],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            
            const distFromCenter = Math.abs(line.y - 57);
            const widthFactor = 1 - (distFromCenter / 60) * 0.4;
            const lineWidth = 100 * widthFactor;
            const xOffset = (130 - lineWidth) / 2;
            
            return (
              <g key={i} transform={`translate(${xOffset - 15}, 0)`}>
                <path
                  d={generateSquiggle(line.y, lineWidth + 30)}
                  fill="none"
                  stroke="#888"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeDasharray="200"
                  strokeDashoffset={200 - pathProgress * 200}
                  style={{ opacity: pathProgress * 0.8 }}
                />
              </g>
            );
          })}
        </svg>
        
        {/* Lightbulb appears at the end */}
        {showLightbulb && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -55%) scale(${lightbulbScale})`,
              opacity: lightbulbScale,
            }}
          >
            <Lightbulb glow={lightbulbScale} />
          </div>
        )}
      </div>
      
      {/* Bubble tail dots */}
      <div
        style={{
          position: "absolute",
          bottom: -15,
          left: 12,
          width: 18,
          height: 18,
          background: "rgba(255,255,255,0.9)",
          borderRadius: "50%",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -30,
          left: 2,
          width: 12,
          height: 12,
          background: "rgba(255,255,255,0.85)",
          borderRadius: "50%",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      />
    </div>
  );
};
