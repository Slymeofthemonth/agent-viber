import React from "react";
import { Composition } from "remotion";
import { 
  type AnimationProps, 
  COMPOSITION_WIDTH, 
  COMPOSITION_HEIGHT, 
  COMPOSITION_FPS, 
  COMPOSITION_DURATION_FRAMES 
} from "./types";
import { SceneRouter } from "./SceneRouter";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AgentAnimation"
      component={SceneRouter}
      durationInFrames={COMPOSITION_DURATION_FRAMES}
      fps={COMPOSITION_FPS}
      width={COMPOSITION_WIDTH}
      height={COMPOSITION_HEIGHT}
      defaultProps={{
        scene: "TYPING_CODE",
        avatarUrl: "https://via.placeholder.com/200",
        mood: "calm",
      } as AnimationProps}
    />
  );
};
