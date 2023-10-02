export interface tableProps<T> {
  data: T[] | undefined
  options: tableOption | string[]
}

export type tableOption = optionsObj[]

export interface optionsObj {
  column: string
  formatter?: {
    (row: any, column: any, cellValue: any, index: number): string | VNode
    (value: any): string | VNode
  }
}
