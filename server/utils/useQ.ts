export async function useQ<T extends keyof queryType>(table: T) {
  return (await useDB()).query[table]
}
type queryType = Awaited<ReturnType<typeof useDB>>['query']
export type Tables = keyof queryType
