export interface menuOptionItem {
  title: string
  key: string | number
  icon?: string
  children?: menuOptionItem[]
}

export interface pathInfoItem extends menuOptionItem {
  path: string
  children?: pathInfoItem[]
}
