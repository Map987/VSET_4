import { execSync } from 'child_process'
import { IpcMainInvokeEvent } from 'electron'

export async function getVideoFrameCount(
  _: IpcMainInvokeEvent,
  videoPath: string
): Promise<number> {
  const command = `ffprobe -v error -select_streams v:0 -count_packets -show_entries stream=nb_read_packets -of csv=p=0 ${videoPath}`
  const result = execSync(command)
  return Number(parseInt(result.toString().trim(), 10))
}
