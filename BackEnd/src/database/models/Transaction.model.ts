import { Model, INTEGER, DATE } from 'sequelize';
import db from '.';
import Account from './Account.model';

class Transaction extends Model {
  id!: number;
  debitedAccountId!: number;
  creditedAccountId!: number;
  value!: number;
  createdAt!: Date;
};

Transaction.init({
  id: {
    allowNull: false,
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  debitedAccountId: {
    allowNull: false,
    type: INTEGER,
    field: 'debited_account_id'
  },

  creditedAccountId: {
    allowNull: false,
    type: INTEGER,
    field: 'credited_account_id'
  },

  value: {
    allowNull: false,
    type: INTEGER,
  },

  createdAt: {
    allowNull: true,
    type: DATE,
    defaultValue: Date(),
    field: 'created_at'
  },

}, {
  sequelize: db,
  modelName: 'transactions',
  timestamps: false,
});

Account.belongsTo(Transaction, { foreignKey: 'id', as: 'creditedAccountId' });
Account.belongsTo(Transaction, { foreignKey: 'id', as: 'debitedAccountId' });

Transaction.hasMany(Account, { foreignKey: 'id', as: 'creditedAccountId' });
Transaction.hasMany(Account, { foreignKey: 'id', as: 'debitedAccountId' });

export default Transaction
