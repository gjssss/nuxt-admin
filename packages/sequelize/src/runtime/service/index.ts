import { Sequelize } from 'sequelize'
import type { ModelAttributes, ModelStatic } from 'sequelize'

let connect: Sequelize | null = null

export function useSequelize() {
  if (!connect)
    connect = defineSequelize()
  return connect
}

export function useModel(q: Sequelize, name: string) {
  return q.model(name)
}

export function defineSequelizeModel<T extends ModelStatic<any>>(modelOption: modelOption<T>) {
  const q = useSequelize()
  modelOption.model.init(
    modelOption.option, { sequelize: q },
  )
  return () =>
    useModel(q, modelOption.model.tableName)
}

export function defineSequelize() {
  return new Sequelize('test', 'root', '123123123', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
      freezeTableName: true,
    },
  })
}

interface modelOption<T extends ModelStatic<any>> {
  model: T
  option: ModelAttributes
}
