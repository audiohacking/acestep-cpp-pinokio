# Pinokio 1-Click installer for Acestep.cpp + AceStep UI

# AceStep.cpp UI

Native C++ AI music generation via [acestep-cpp-ui](https://github.com/audiohacking/acestep-cpp-ui), powered by the [acestep.cpp](https://github.com/audiohacking/acestep.cpp) GGUF-native inference engine. No Python required.

## Features

- No Python dependency — standalone C++ + Node.js
- GGUF quantization support (Q4–Q8, BF16)
- Multi-GPU: CUDA, Vulkan (Linux), Metal/MPS (macOS Apple Silicon)
- Generate music from text prompts or structured lyrics

## Platform Support

| Platform | Backend | Binary Source |
|----------|---------|---------------|
| macOS Apple Silicon | Metal (MPS) | Pre-built release |
| Linux x64 | CUDA / Vulkan (auto-detected) | Pre-built release |
| Windows x64 | CUDA | Builds from source (requires MSVC 2022+) |

## Installation

Click **Install** in Pinokio. This will:

1. Clone the UI repository
2. Download pre-built C++ engine binaries (~few MB)
3. Install Node.js dependencies
4. Download GGUF models (~8 GB, default Q8_0 quantization)

Model download can be cancelled with Ctrl+C and restarted later.

## Usage

Click **Start** to launch the server, then **Open Web UI** to access the interface at `http://localhost:3001`.

### Generation Modes

- **Simple** — text prompt only
- **Custom** — full control: lyrics (`[Verse]`/`[Chorus]` structure), style, duration (30–240s), BPM (60–200), musical key

## API Access

The server exposes a REST API at `http://localhost:3001`.

### Generate (JavaScript)

```javascript
const res = await fetch('http://localhost:3001/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'upbeat electronic dance music with synth leads',
    duration: 60
  })
})
const { audioUrl } = await res.json()
```

### Generate (Python)

```python
import requests

res = requests.post('http://localhost:3001/api/generate', json={
    'prompt': 'upbeat electronic dance music with synth leads',
    'duration': 60
})
print(res.json()['audioUrl'])
```

### Generate (curl)

```bash
curl -X POST http://localhost:3001/api/generate \
  -H 'Content-Type: application/json' \
  -d '{"prompt": "upbeat electronic dance music with synth leads", "duration": 60}'
```

## Model Management

Additional GGUF models can be managed from the **Models** tab in the web UI, or by re-running models.sh from the `app/` folder:

```bash
cd app
bash models.sh --quant Q4_K_M   # smaller, faster
bash models.sh --quant Q6_K     # better quality
bash models.sh --lm 1.7B        # smaller language model
```
