// ../../vspipe -c -y4m "./././././" - | ffmpeg -i pipe: -i "././././" -c:v libx265 -preset ultrafast -crf 0 -c:a copy "./..dfwefewfew.mp4"
interface IVideoInfo {
  frameCount: number
}

export async function getVideoInfo(): Promise<IVideoInfo> {
  return {
    frameCount: 0
  }
}
