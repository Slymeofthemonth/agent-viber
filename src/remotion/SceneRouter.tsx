import React from "react";
import type { AnimationProps } from "./types";
import { TypingCode } from "./scenes/TypingCode";
import { AnalyzingData } from "./scenes/AnalyzingData";
import { Thinking } from "./scenes/Thinking";
import { Searching } from "./scenes/Searching";
import { Connecting } from "./scenes/Connecting";

export const SceneRouter: React.FC<AnimationProps> = (props) => {
  switch (props.scene) {
    case "TYPING_CODE":
      return <TypingCode {...props} />;
    case "ANALYZING_DATA":
      return <AnalyzingData {...props} />;
    case "THINKING":
      return <Thinking {...props} />;
    case "SEARCHING":
      return <Searching {...props} />;
    case "CONNECTING":
      return <Connecting {...props} />;
    default:
      return <TypingCode {...props} />;
  }
};
