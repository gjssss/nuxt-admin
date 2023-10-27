import type { CreationOptional, InferAttributes, InferCreationAttributes, ModelAttributes } from 'sequelize'
import { DataTypes, Model } from 'sequelize'

class Test extends Model<InferAttributes<Test>, InferCreationAttributes<Test>> {
  declare id: CreationOptional<number>
  declare date: Date
  declare name: string
  declare address: string
}

const Option: ModelAttributes = {
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
}

export default {
  model: Test,
  Option,
}
