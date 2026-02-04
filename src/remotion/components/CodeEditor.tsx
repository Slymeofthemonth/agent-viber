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

export const CodeEditor: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  
  // Characters revealed over time
  const totalChars = CODE_LINES.join("\n").length;
  const charsToShow = Math.floor(
    interpolate(frame, [0, durationInFrames - 30], [0, totalChars], {
      extrapolateRight: "clamp",
    })
  );
  
  // Build visible text
  let charCount = 0;
  const visibleLines = CODE_LINES.map((line, i) => {
    const lineStart = charCount;
    charCount += line.length + 1; // +1 for newline
    
    if (charsToShow < lineStart) return "";
    if (charsToShow >= charCount) return line;
    return line.slice(0, charsToShow - lineStart);
  });
  
  // Cursor blink
  const cursorVisible = Math.floor(frame / (fps / 2)) % 2 === 0;

  const getLineColor = (fullLine: string): string => {
    if (fullLine.startsWith("//")) return "#6a9955";
    if (fullLine.startsWith("async") || fullLine.startsWith("const") || fullLine.startsWith("return")) return "#569cd6";
    return "#d4d4d4";
  };

  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        borderRadius: 8,
        padding: 16,
        fontFamily: "monospace",
        fontSize: 13,
        lineHeight: 1.5,
        color: "#d4d4d4",
        width: 260,
        height: 200,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      {visibleLines.map((line, i) => (
        <div key={i} style={{ minHeight: "1.5em" }}>
          <span style={{ color: getLineColor(CODE_LINES[i]) }}>
            {line}
          </span>
          {i === visibleLines.filter(l => l).length - 1 && cursorVisible && (
            <span style={{ 
              backgroundColor: "#569cd6", 
              width: 8, 
              height: 16, 
              display: "inline-block",
              marginLeft: 2,
            }} />
          )}
        </div>
      ))}
    </div>
  );
};
