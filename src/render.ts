import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import os from "os";
import type { AnimationProps, Scene, Mood } from "./remotion/types.js";

type RenderOptions = {
  scene: Scene;
  avatarUrl: string;
  mood: Mood;
  format: "mp4" | "gif" | "webm";
};

let bundled: string | null = null;

async function getBundled(): Promise<string> {
  if (bundled) return bundled;
  
  const entryPoint = path.join(process.cwd(), "src/remotion/index.tsx");
  bundled = await bundle({
    entryPoint,
    onProgress: (progress) => {
      if (progress % 25 === 0) console.log(`Bundling: ${progress}%`);
    },
  });
  
  return bundled;
}

export async function renderAnimation(options: RenderOptions): Promise<Buffer> {
  const { scene, avatarUrl, mood, format } = options;
  
  console.log(`Starting render: ${scene} / ${mood} / ${format}`);
  
  const bundleLocation = await getBundled();
  
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "AgentAnimation",
    inputProps: {
      scene,
      avatarUrl,
      mood,
    } satisfies AnimationProps,
  });
  
  // Create temp output file
  const tempDir = os.tmpdir();
  const outputPath = path.join(tempDir, `render-${Date.now()}.${format}`);
  
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: format === "gif" ? "gif" : format === "webm" ? "vp8" : "h264",
    outputLocation: outputPath,
    inputProps: {
      scene,
      avatarUrl,
      mood,
    } satisfies AnimationProps,
    onProgress: ({ progress }) => {
      if (Math.round(progress * 100) % 25 === 0) {
        console.log(`Rendering: ${Math.round(progress * 100)}%`);
      }
    },
  });
  
  // Read file into buffer
  const buffer = fs.readFileSync(outputPath);
  
  // Cleanup temp file
  fs.unlinkSync(outputPath);
  
  console.log(`Render complete: ${buffer.length} bytes`);
  
  return buffer;
}
