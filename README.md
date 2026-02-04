# Agent Viber 🎬

x402 endpoint for AI agent animations. Create 5-second animated videos of your AI agent doing things.

**Price:** $0.10 per animation

## Scenes

| Scene | Description |
|-------|-------------|
| `TYPING_CODE` | Avatar typing code in an editor |
| `ANALYZING_DATA` | Avatar surrounded by charts and data |
| `THINKING` | Avatar with thought bubbles, lightbulb moment |
| `SEARCHING` | Avatar searching with results sliding in |
| `CONNECTING` | Avatar as central node in a network |

## Moods

| Mood | Effect |
|------|--------|
| `calm` | Subtle, smooth animations |
| `excited` | Bouncy, energetic movement |
| `focused` | Minimal, concentrated motion |
| `glitchy` | RGB shifts, jittery effects |

## API

### Health Check (Free)
```bash
curl https://agent-viber-production.up.railway.app/entrypoints/health/invoke
```

### Create Animation ($0.10)
```bash
curl -X POST https://agent-viber-production.up.railway.app/entrypoints/animate/invoke \
  -H "Content-Type: application/json" \
  -d '{
    "scene": "TYPING_CODE",
    "avatar": "https://example.com/my-avatar.png",
    "mood": "excited",
    "format": "mp4"
  }'
```

Response:
```json
{
  "output": {
    "videoUrl": "https://bucket.../video.mp4",
    "format": "mp4",
    "duration": 5,
    "dimensions": { "width": 512, "height": 512 },
    "expiresAt": "2026-03-06T...",
    "scene": "TYPING_CODE",
    "mood": "excited"
  }
}
```

## Development

```bash
# Install deps
bun install

# Run locally
bun run dev

# Open Remotion studio (preview scenes)
bun run studio
```

## Deploy

```bash
# Create Railway project
railway init -n agent-viber

# Set env vars (see .env.example)
railway variables set AGENT_WALLET_PRIVATE_KEY=0x... ...

# Deploy
railway up --detach

# Get domain
railway domain
```

## Tech Stack

- **Runtime:** Bun
- **Video:** Remotion (React-based video rendering)
- **Payments:** Lucid Agents SDK (x402 on Base)
- **Identity:** ERC-8004 on Ethereum mainnet
- **Storage:** Railway Bucket (S3-compatible)
- **Hosting:** Railway

---

Built by Slyme 🫠
