import { createAgent } from '@lucid-agents/core';
import { http } from '@lucid-agents/http';
import { createAgentApp } from '@lucid-agents/hono';
import { payments, paymentsFromEnv } from '@lucid-agents/payments';
import { z } from 'zod';
import agentRegistration from './agent-registration.json';
import { renderAnimation } from './render.js';
import { uploadToStorage } from './upload.js';

// Input schema
const AnimationInput = z.object({
  scene: z.enum(["TYPING_CODE", "ANALYZING_DATA", "THINKING", "SEARCHING", "CONNECTING"]),
  avatar: z.string().url().describe("URL to avatar image (PNG, JPG, WebP)"),
  mood: z.enum(["calm", "excited", "focused", "glitchy"]).default("calm"),
  format: z.enum(["mp4", "gif", "webm"]).default("mp4"),
});

async function main() {
  const agent = await createAgent({
    name: process.env.AGENT_NAME ?? 'agent-viber',
    version: process.env.AGENT_VERSION ?? '1.0.0',
    description: 'Create animated videos of AI agents - 5 scenes, 4 moods, $0.10 per animation',
  })
    .use(http())
    .use(payments({ 
      config: {
        ...paymentsFromEnv(),
        facilitatorUrl: process.env.FACILITATOR_URL || 'https://x402.dexter.cash',
      }
    }))
    .build();

  const { app, addEntrypoint } = await createAgentApp(agent);

  // ERC-8004 registration endpoint
  app.get('/.well-known/agent-registration.json', (c) => c.json(agentRegistration));

  // Health check (free)
  app.get('/health', (c) => c.json({ 
    status: 'ok', 
    service: 'agent-viber',
    scenes: ['TYPING_CODE', 'ANALYZING_DATA', 'THINKING', 'SEARCHING', 'CONNECTING'],
    moods: ['calm', 'excited', 'focused', 'glitchy'],
    timestamp: new Date().toISOString() 
  }));

  // Main animation endpoint (paid - $0.10)
  addEntrypoint({
    key: 'animate',
    description: 'Create a 5-second animation of your AI agent. Provide avatar URL, pick a scene and mood.',
    input: AnimationInput,
    price: process.env.PRICE || '0.10',
    handler: async (ctx) => {
      const { scene, avatar, mood, format } = ctx.input;
      
      console.log(`Rendering animation: scene=${scene}, mood=${mood}, format=${format}`);
      
      // Render with Remotion
      const videoBuffer = await renderAnimation({
        scene,
        avatarUrl: avatar,
        mood,
        format,
      });
      
      // Upload to storage
      const videoUrl = await uploadToStorage(videoBuffer, format);
      
      // Calculate expiry (30 days)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);
      
      return {
        output: {
          videoUrl,
          format,
          duration: 5,
          dimensions: { width: 512, height: 512 },
          expiresAt: expiresAt.toISOString(),
          scene,
          mood,
        },
      };
    },
  });

  const port = Number(process.env.PORT ?? 3000);
  console.log(`Agent Viber running on port ${port}`);
  console.log(`Scenes: TYPING_CODE, ANALYZING_DATA, THINKING, SEARCHING, CONNECTING`);
  console.log(`Moods: calm, excited, focused, glitchy`);
  
  Bun.serve({ port, fetch: app.fetch });
}

main().catch(console.error);
