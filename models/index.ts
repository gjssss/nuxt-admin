import type { ModelAttributes, ModelStatic } from 'sequelize'
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

function setupModel<T extends ModelStatic<any>>(modules: { model: T; Option: ModelAttributes }) {
  (modules.model as any).init(modules.Option, { sequelize: connect })
  return modules.model
}

setupModel(user)
setupModel(test)
export const User = user.model
export const Test = test.model

// type ModelClass = {
//   new (): Model<InferAttributes<any>, InferCreationAttributes<any>>
// } & typeof Model

// interface modelInfo {
//   model: ModelClass
//   Option: ModelAttributes
// }
