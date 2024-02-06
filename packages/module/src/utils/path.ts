/**
 * 用于生成路由路径，忽略index
 * @param root 根路径
 * @param end 端点路径
 */
export function mergePath(root: string, end: string) {
  const arr: string[] = []
  if (root && root !== 'index')
    arr.push(root)

  if (end && end !== 'index')
    arr.push(end)
  return `/${arr.join('/')}`
}
