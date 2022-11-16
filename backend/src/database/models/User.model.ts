import { Model, INTEGER, STRING } from 'sequelize';
import Account from './Account.model';
import db from '.';

class User extends Model {
  id!: number;
  username!: string;
  password!: string;
  accountId!: number;
}

User.init(
  {
    id: {
      allowNull: false,
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      allowNull: false,
      type: STRING,
      unique: true,
    },

    password: {
      allowNull: false,
      type: STRING,
    },

    accountId: {
      allowNull: false,
      type: INTEGER,
      field: 'account_id',
    },
  },
  {
    sequelize: db,
    modelName: 'users',
    timestamps: false,
  }
);

Account.belongsTo(User, { foreignKey: 'id', as: 'account_id' });

User.hasOne(Account, { foreignKey: 'id', as: 'account_id' });

export default User;
