import { Model, INTEGER } from 'sequelize';
import db from '.';

class Account extends Model {
  id!: number;
  balance!: number;
}

Account.init({
  id: {
    allowNull: false,
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  balance: {
    allowNull: false,
    type: INTEGER,
  }
}, {
  sequelize: db,
  modelName: 'accounts',
  timestamps: false,
});

export default Account