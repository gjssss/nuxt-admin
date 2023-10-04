import type { Model, ModelAttributes } from 'sequelize'
import { Sequelize } from 'sequelize'
import user from './user'
import test from './test'

export const connect = new Sequelize('test', 'root', '123123123', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    freezeTableName: true,
  },
})

type ModelClass = {
  new (): Model
} & typeof Model

interface modelInfo {
  model: ModelClass
  Option: ModelAttributes
}
// TODO: 待修改
function setupModel(conn: Sequelize, info: modelInfo) {
  info.model.init(info.Option, { sequelize: conn })
}

setupModel(connect, user)
setupModel(connect, test)

export const User = user.model
export const Test = test.model
