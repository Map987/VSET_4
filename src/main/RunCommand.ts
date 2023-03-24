import { spawn } from 'child_process'

let child
export async function RunCommand(event, command): Promise<void> {
  child = spawn(command, { shell: true })

  child.stdout.on('data', (data) => {
    event.sender.send('command-stdout', data.toString())
  })

  child.stderr.on('data', (data) => {
    event.sender.send('command-stderr', data.toString())
  })

  child.on('close', (code) => {
    event.sender.send('command-close-code', code)
  })
}

export async function KillCommand(): Promise<void> {
  if (child) {
    child.kill()
  }
}
