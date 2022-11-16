import { Op } from 'sequelize';
import Transaction from '../database/models/Transaction.model';
import ITransaction from '../interfaces/ITransaction';
import { ErrorHandler } from '../middlewares/errorMiddleware';
import AccountServices from './account.services';

const TransactionServices = {
  async createTransaction({
    debitedAccountId,
    creditedAccountId,
    value,
  }: ITransaction) {
    const user1 = await AccountServices.getAccount(debitedAccountId);
    if (user1.balance < value) {
      throw new ErrorHandler('insufficient funds', 401);
    }
    await AccountServices.subValue(value, debitedAccountId);
    await AccountServices.addValue(value, creditedAccountId);

    const transaction = await Transaction.create({
      debitedAccountId,
      creditedAccountId,
      value,
    });
    return transaction;
  },

  async getAllTransactions() {
    const transactions = await Transaction.findAll();
    return transactions;
  },

  async getTransactionsById(id: number) {
    const transactions = await Transaction.findAll({
      where: {
        [Op.or]: [{ creditedAccountId: id }, { debitedAccountId: id }],
      },
    });
    return transactions;
  },
};

export default TransactionServices;
