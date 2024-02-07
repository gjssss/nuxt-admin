import { reactive } from 'vue'
import type { tableOption } from '../components/common/table/interface'

export function defineTableOption(options: tableOption): tableOption {
  return reactive(options)
}
