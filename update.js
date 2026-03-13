module.exports = {
  run: [
    // Pull launcher script updates
    {
      method: "shell.run",
      params: {
        message: "git pull"
      }
    },
    // Pull UI app updates
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "git pull"
      }
    },
    // Re-download latest pre-built binaries for macOS
    {
      when: "{{platform === 'darwin'}}",
      method: "shell.run",
      params: {
        path: "app",
        message: "curl -L https://github.com/audiohacking/acestep.cpp/releases/download/v0.0.1/acestep-macos-arm64-metal.tar.gz | tar xz"
      }
    },
    // Re-download latest pre-built binaries for Linux x64
    {
      when: "{{platform === 'linux' && arch === 'x64'}}",
      method: "shell.run",
      params: {
        path: "app",
        message: "curl -L https://github.com/audiohacking/acestep.cpp/releases/download/v0.0.1/acestep-linux-x64.tar.gz | tar xz"
      }
    },
    // Update npm dependencies
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "npm install"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app/server",
        message: [
          "npm install",
          "npm rebuild better-sqlite3"
        ]
      }
    }
  ]
}
