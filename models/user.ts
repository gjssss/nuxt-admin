import type { ModelAttributes } from 'sequelize'
import { DataTypes, Model } from 'sequelize'

class User extends Model {
  declare id: number
  declare name: string
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
}

export default {
  model: User,
  Option,
}
