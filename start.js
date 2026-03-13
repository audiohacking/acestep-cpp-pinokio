module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "{{platform === 'win32' ? 'start-all.bat' : 'bash start-all.sh'}}",
        on: [{
          event: "/(http:\\/\\/[^\\s]+)/",
          done: true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[1]}}"
      }
    }
  ]
}
