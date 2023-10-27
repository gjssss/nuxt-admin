type DataReqType = (page?: number, pageSize?: number) => Promise<any>

export interface tableProps {
  data: DataReqType | any[]
  options: tableOption | string[]
  /**
   * 是否启用分页
   * @default true 启用分页
   */
  pagination?: boolean
}

export type tableOption = optionsObj[]

export interface optionsObj {
  /**
   * 表栏key（唯一标识），与数据中的字段相对应
   */
  column: string
  /**
   * 用于对数据进行变换或修改（对自定义栏不生效）
   *
   * 除了可以使用Element Plus中函数签名外，还支持简写
   *
   * `(value: any): string | VNode`
   *
   * Nuxt Admin会根据参数个数选择相对于的函数
   */
  formatter?: {
    (row: any, column: any, cellValue: any, index: number): string | VNode
    (value: any): string | VNode
  }
  /**
   * 表栏的标签，显示在表头
   */
  label?: string
}
