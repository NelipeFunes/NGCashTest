import { Model, INTEGER, DECIMAL } from 'sequelize';
import db from '.';

class Account extends Model {
  id!: number;
  balance!: number;
}

Account.init(
  {
    id: {
      allowNull: false,
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    balance: {
      allowNull: false,
      type: DECIMAL(10,2)
    },
  },
  {
    sequelize: db,
    modelName: 'accounts',
    timestamps: false,
  }
);

export default Account;
