import type { ModelAttributes } from 'sequelize'
import { DataTypes, Model } from 'sequelize'

class User extends Model {
  declare id: number
  declare userName: string
  declare password: string
}

const Option: ModelAttributes = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
}

export default {
  model: User,
  Option,
}
