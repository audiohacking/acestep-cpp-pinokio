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
    // Pull acestep.cpp updates and rebuild (macOS)
    {
      method: "shell.run",
      params: {
        path: "app/acestep.cpp",
        message: "git pull && git submodule update --init --recursive"
      }
    },
    {
      when: "{{platform === 'darwin'}}",
      method: "shell.run",
      params: {
        path: "app",
        message: "bash build.sh"
      }
    },
    {
      when: "{{platform === 'linux' && arch === 'x64'}}",
      method: "shell.run",
      params: {
        path: "app",
        env: {
          VULKAN_SDK: "{{envs.CONDA_PREFIX}}"
        },
        message: "bash build.sh"
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
