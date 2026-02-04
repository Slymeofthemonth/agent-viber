import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

const CODE_LINES = [
  "async function analyze(data) {",
  "  const result = await fetch(api);",
  "  const parsed = JSON.parse(result);",
  "  return parsed.filter(x => x.valid);",
  "}",
  "",
  "// Processing complete ✓",
];

export const Monitor: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  
  // SLOWER: Characters revealed over time (use 80% of duration instead of faster)
  const totalChars = CODE_LINES.join("\n").length;
  const charsToShow = Math.floor(
    interpolate(frame, [0, durationInFrames * 0.85], [0, totalChars], {
      extrapolateRight: "clamp",
    })
  );
  
  // Build visible text
  let charCount = 0;
  const visibleLines = CODE_LINES.map((line) => {
    const lineStart = charCount;
    charCount += line.length + 1;
    
    if (charsToShow < lineStart) return "";
    if (charsToShow >= charCount) return line;
    return line.slice(0, charsToShow - lineStart);
  });
  
  // Cursor blink (slower)
  const cursorVisible = Math.floor(frame / (fps / 1.5)) % 2 === 0;

  const getLineColor = (fullLine: string): string => {
    if (fullLine.startsWith("//")) return "#6a9955";
    if (fullLine.startsWith("async") || fullLine.startsWith("const") || fullLine.startsWith("return")) return "#569cd6";
    return "#d4d4d4";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Monitor */}
      <div
        style={{
          background: "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)",
          borderRadius: 12,
          padding: 8,
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Screen bezel */}
        <div
          style={{
            background: "#0a0a0a",
            borderRadius: 6,
            padding: 4,
            border: "2px solid #333",
          }}
        >
          {/* Screen content */}
          <div
            style={{
              backgroundColor: "#1e1e1e",
              borderRadius: 4,
              padding: 12,
              fontFamily: "monospace",
              fontSize: 11,
              lineHeight: 1.4,
              color: "#d4d4d4",
              width: 220,
              height: 140,
              overflow: "hidden",
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.3)",
            }}
          >
            {visibleLines.map((line, i) => (
              <div key={i} style={{ minHeight: "1.4em" }}>
                <span style={{ color: getLineColor(CODE_LINES[i]) }}>
                  {line}
                </span>
                {i === visibleLines.filter(l => l).length - 1 && cursorVisible && (
                  <span style={{ 
                    backgroundColor: "#569cd6", 
                    width: 6, 
                    height: 12, 
                    display: "inline-block",
                    marginLeft: 1,
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Monitor stand neck */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <div
            style={{
              width: 30,
              height: 12,
              background: "linear-gradient(180deg, #3a3a3a, #2a2a2a)",
              borderRadius: "0 0 4px 4px",
            }}
          />
        </div>
      </div>
      
      {/* Monitor base */}
      <div
        style={{
          width: 60,
          height: 6,
          background: "linear-gradient(180deg, #3a3a3a, #2a2a2a)",
          borderRadius: 3,
          marginTop: -2,
        }}
      />
    </div>
  );
};

// Separate keyboard component for the middle
export const Keyboard: React.FC = () => {
  const frame = useCurrentFrame();
  
  // SLOWER: Key press animation (every 8 frames instead of every 12)
  const activeKey = Math.floor(frame / 8) % 27;
  
  const rows = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25, 26],
  ];
  
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #2a2a2a, #1a1a1a)",
        borderRadius: 8,
        padding: 10,
        boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
        transform: "rotate(-45deg)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex", gap: 3, justifyContent: "center" }}>
            {row.map((keyId) => {
              const isActive = keyId === activeKey || keyId === (activeKey + 13) % 27;
              return (
                <div
                  key={keyId}
                  style={{
                    width: rowIndex === 2 ? 16 : 14,
                    height: 12,
                    background: isActive 
                      ? "linear-gradient(180deg, #39ff14, #2eb82e)" 
                      : "linear-gradient(180deg, #4a4a4a, #3a3a3a)",
                    borderRadius: 3,
                    boxShadow: isActive 
                      ? "0 0 10px #39ff14" 
                      : "inset 0 -1px 0 rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                    transform: isActive ? "translateY(1px)" : "none",
                  }}
                />
              );
            })}
          </div>
        ))}
        {/* Spacebar */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <div
            style={{
              width: 90,
              height: 12,
              background: Math.floor(frame / 12) % 3 === 0
                ? "linear-gradient(180deg, #39ff14, #2eb82e)"
                : "linear-gradient(180deg, #4a4a4a, #3a3a3a)",
              borderRadius: 3,
              boxShadow: Math.floor(frame / 12) % 3 === 0
                ? "0 0 10px #39ff14"
                : "inset 0 -1px 0 rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
