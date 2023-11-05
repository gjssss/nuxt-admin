import { kebabCase } from 'scule'

export function getNameFromPath(path: string) {
  const fileName = path.split('/').pop()!
  const name = fileName.substring(0, fileName.lastIndexOf('.'))
  return kebabCase(name)
}
