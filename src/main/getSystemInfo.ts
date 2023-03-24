import { IpcMainInvokeEvent } from 'electron'
import si from 'systeminformation'
import { exec } from 'child_process'

async function hasNvidiaGPU(): Promise<boolean> {
  const command = 'nvidia-smi'
  return new Promise<boolean>((resolve) => {
    exec(command, (error, stdout) => {
      if (error) {
        resolve(false)
      } else {
        resolve(stdout.toLowerCase().includes('nvidia'))
      }
    })
  })
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getSystemInfo(_: IpcMainInvokeEvent) {
  const hasNvidia = await hasNvidiaGPU()
  const getsystem = (await si.osInfo()).platform
  const getsystemArch = (await si.osInfo()).arch
  const gpulist: string[] = []
  const res = await si.graphics()
  for (const i in res.controllers) {
    gpulist.push(String(res.controllers[i].model))
  }

  const r: [boolean, string, string, string[]] = [
    hasNvidia,
    String(getsystem),
    String(getsystemArch),
    gpulist
  ]
  return r
}
