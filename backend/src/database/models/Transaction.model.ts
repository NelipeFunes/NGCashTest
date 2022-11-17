import { Model, INTEGER,DECIMAL, DATEONLY} from 'sequelize';
import db from '.';
import Account from './Account.model';

class Transaction extends Model {
  id!: number;
  debitedAccountId!: number;
  creditedAccountId!: number;
  value!: number;
  createdAt!: Date;
}

Transaction.init(
  {
    id: {
      allowNull: false,
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    debitedAccountId: {
      allowNull: false,
      type: INTEGER,
      field: 'debited_account_id',
    },

    creditedAccountId: {
      allowNull: false,
      type: INTEGER,
      field: 'credited_account_id',
    },

    value: {
      allowNull: false,
      type: DECIMAL(10,2),
    },

    createdAt: {
      allowNull: true,
      type: DATEONLY,
      field: 'created_at',
    },
  },
  {
    sequelize: db,
    modelName: 'transactions',
    timestamps: false,
  }
);

Account.belongsTo(Transaction, { foreignKey: 'id', as: 'credited_account_id' });
Account.belongsTo(Transaction, { foreignKey: 'id', as: 'debited_account_id' });

Transaction.hasMany(Account, { foreignKey: 'id', as: 'credited_account_id' });
Transaction.hasMany(Account, { foreignKey: 'id', as: 'debited_account_id' });

export default Transaction;
