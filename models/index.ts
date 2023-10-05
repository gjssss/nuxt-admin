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

// TODO: 缺少类型定义
function setupModel(modules: any) {
  modules.model.init(modules.Option, { sequelize: connect })
  return modules.model
}

user.model.init(user.Option, { sequelize: connect })
test.model.init(test.Option, { sequelize: connect })
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
