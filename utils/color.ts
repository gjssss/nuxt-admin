export function changeAlpha(hexColor: string, alpha: number): string {
  // 移除可能存在的 # 符号
  hexColor = hexColor.replace(/^#/, '')

  // 解析红、绿、蓝分量
  const red = Number.parseInt(hexColor.slice(0, 2), 16)
  const green = Number.parseInt(hexColor.slice(2, 4), 16)
  const blue = Number.parseInt(hexColor.slice(4, 6), 16)

  // 确保 alpha 值在 0 到 1 之间
  alpha = Math.min(1, Math.max(0, alpha))

  // 使用 rgba 格式创建新颜色
  const rgbaColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`

  return rgbaColor
}
