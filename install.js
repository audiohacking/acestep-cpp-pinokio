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
    // Install cmake via conda for macOS build
    {
      when: "{{platform === 'darwin'}}",
      method: "shell.run",
      params: {
        message: "conda install -y -c conda-forge cmake"
      }
    },
    // Build from source using build.sh (macOS - handles clone + GPU auto-detection + build)
    {
      when: "{{platform === 'darwin'}}",
      method: "shell.run",
      params: {
        path: "app",
        message: "bash build.sh"
      }
    },
    // Install cmake and Vulkan headers via conda for Linux x64
    {
      when: "{{platform === 'linux' && arch === 'x64'}}",
      method: "shell.run",
      params: {
        message: "conda install -y -c conda-forge cmake vulkan-headers"
      }
    },
    // Build from source using build.sh (Linux - handles clone + GPU auto-detection + build)
    {
      when: "{{platform === 'linux' && arch === 'x64'}}",
      method: "shell.run",
      params: {
        path: "app",
        message: "bash build.sh"
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
