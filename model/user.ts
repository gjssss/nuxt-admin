import { DataTypes, Model } from 'sequelize'
import type { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize'
import { defineSequelizeModel } from '#nuxt/sequelize'

class Test extends Model<InferAttributes<Test>, InferCreationAttributes<Test>> {
  declare id: CreationOptional<number>
  declare date: Date
  declare name: string
  declare address: string
}

export const hola = defineSequelizeModel({
  model: Test,
  option: {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
})
