// 按比例插值两个颜色
function interpolateColor(color1: string, color2: string, factor: number): string {
  if (factor === 0) return color1
  if (factor === 1) return color2

  const c1 = hexToRgb(color1)
  const c2 = hexToRgb(color2)

  const r = Math.round(interpolate(c1.r, c2.r, factor))
  const g = Math.round(interpolate(c1.g, c2.g, factor))
  const b = Math.round(interpolate(c1.b, c2.b, factor))

  return `rgb(${r}, ${g}, ${b})`
}

function interpolate(start: number, end: number, factor: number): number {
  return start + (end - start) * factor
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}
// 平滑过渡黑暗模式

export { interpolateColor }
