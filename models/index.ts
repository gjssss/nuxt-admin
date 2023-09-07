import type { Model, ModelAttributes } from 'sequelize'
import { Sequelize } from 'sequelize'
import user from './user'

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

export interface modelInfo {
  model: ModelClass
  Option: ModelAttributes
}

function setupModel(conn: Sequelize, info: modelInfo) {
  info.model.init(info.Option, { sequelize: conn })
}

setupModel(connect, user)

export const User = user.model
