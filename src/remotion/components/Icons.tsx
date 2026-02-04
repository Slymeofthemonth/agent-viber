import React from "react";

// Magnifying glass SVG
export const MagnifyingGlass: React.FC<{ size?: number }> = ({ size = 50 }) => (
  <svg width={size} height={size} viewBox="0 0 50 50">
    <circle
      cx="20"
      cy="20"
      r="14"
      fill="none"
      stroke="#60a5fa"
      strokeWidth="4"
    />
    <line
      x1="30"
      y1="30"
      x2="45"
      y2="45"
      stroke="#60a5fa"
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Glass shine */}
    <path
      d="M12 14 Q14 10 18 12"
      fill="none"
      stroke="rgba(255,255,255,0.5)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Network node icons as simple shapes with letters/symbols
export const NetworkIcon: React.FC<{ type: string; size?: number }> = ({ type, size = 24 }) => {
  const colors: Record<string, string> = {
    web: "#60a5fa",
    signal: "#f472b6",
    data: "#4ade80",
    link: "#facc15",
    bolt: "#fb923c",
    bot: "#a78bfa",
  };
  
  const color = colors[type] || "#60a5fa";
  
  const renderIcon = () => {
    switch (type) {
      case "web": // Globe
        return (
          <>
            <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2" />
            <ellipse cx="12" cy="12" rx="4" ry="10" fill="none" stroke={color} strokeWidth="1.5" />
            <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1.5" />
          </>
        );
      case "signal": // Antenna/broadcast
        return (
          <>
            <circle cx="12" cy="16" r="3" fill={color} />
            <path d="M6 10 Q12 4 18 10" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <path d="M3 6 Q12 -2 21 6" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </>
        );
      case "data": // Database/storage
        return (
          <>
            <ellipse cx="12" cy="6" rx="8" ry="3" fill="none" stroke={color} strokeWidth="2" />
            <path d="M4 6 L4 18 Q4 21 12 21 Q20 21 20 18 L20 6" fill="none" stroke={color} strokeWidth="2" />
            <ellipse cx="12" cy="12" rx="8" ry="2" fill="none" stroke={color} strokeWidth="1.5" />
          </>
        );
      case "link": // Chain link
        return (
          <>
            <rect x="3" y="8" width="8" height="8" rx="2" fill="none" stroke={color} strokeWidth="2" />
            <rect x="13" y="8" width="8" height="8" rx="2" fill="none" stroke={color} strokeWidth="2" />
            <line x1="11" y1="12" x2="13" y2="12" stroke={color} strokeWidth="2" />
          </>
        );
      case "bolt": // Lightning
        return (
          <path
            d="M13 2 L6 12 L11 12 L9 22 L18 10 L12 10 L13 2"
            fill={color}
            stroke={color}
            strokeWidth="1"
            strokeLinejoin="round"
          />
        );
      case "bot": // Robot face
        return (
          <>
            <rect x="4" y="6" width="16" height="14" rx="2" fill="none" stroke={color} strokeWidth="2" />
            <circle cx="9" cy="12" r="2" fill={color} />
            <circle cx="15" cy="12" r="2" fill={color} />
            <line x1="12" y1="2" x2="12" y2="6" stroke={color} strokeWidth="2" />
            <circle cx="12" cy="2" r="1.5" fill={color} />
          </>
        );
      default:
        return <circle cx="12" cy="12" r="8" fill={color} />;
    }
  };
  
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {renderIcon()}
    </svg>
  );
};
