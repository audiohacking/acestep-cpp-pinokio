module.exports = {
  run: [
    // Clone the UI repository
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: "git clone https://github.com/audiohacking/acestep-cpp-ui app"
      }
    },
    // Download pre-built binaries for macOS Apple Silicon (Metal/MPS)
    {
      when: "{{platform === 'darwin'}}",
      method: "shell.run",
      params: {
        path: "app/bin",
        message: "curl -L https://github.com/audiohacking/acestep.cpp/releases/download/v0.0.1/acestep-macos-arm64-metal.tar.gz | tar xz"
      }
    },
    // Download pre-built binaries for Linux x64 (CUDA/Vulkan auto-detected at runtime)
    {
      when: "{{platform === 'linux' && arch === 'x64'}}",
      method: "shell.run",
      params: {
        path: "app/bin",
        message: "curl -L https://github.com/audiohacking/acestep.cpp/releases/download/v0.0.1/acestep-linux-x64.tar.gz | tar xz"
      }
    },
    // Windows: build from source (no pre-built binary available yet)
    {
      when: "{{platform === 'win32' && !exists('app/bin')}}",
      method: "shell.run",
      params: {
        path: "app",
        message: "setup.bat"
      }
    },
    // Install Node.js dependencies for the React/Vite frontend
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "npm install"
      }
    },
    // Install and rebuild server dependencies
    {
      method: "shell.run",
      params: {
        path: "app/server",
        message: [
          "npm install",
          "npm rebuild better-sqlite3"
        ]
      }
    },
    // Create .env from template
    {
      when: "{{!exists('app/.env')}}",
      method: "shell.run",
      params: {
        path: "app",
        message: "{{platform === 'win32' ? 'copy .env.example .env' : 'cp .env.example .env'}}"
      }
    },
    // Download GGUF models (~8 GB, default Q8_0 quantization)
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "{{platform === 'win32' ? 'models.bat' : 'bash models.sh'}}"
      }
    }
  ]
}
