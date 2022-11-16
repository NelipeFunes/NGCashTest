import { Op } from 'sequelize';
import { ITransaction } from '../interfaces/index';
import Transaction from '../database/models/Transaction.model';
import { ErrorHandler } from '../middlewares/errorMiddleware';
import AccountServices from './account.services';

const TransactionServices = {
  async createTransaction({
    debitedAccountId, creditedAccountId, value,
  }: ITransaction, accountId: number) {
    if (debitedAccountId !== accountId) throw new ErrorHandler('Nao é sua conta', 401);

    const user1 = await AccountServices.getAccount(debitedAccountId);

    if (user1.balance < value) {
      throw new ErrorHandler('insufficient funds', 401);
    }

    const transaction = await Transaction.create({
      debitedAccountId,
      creditedAccountId,
      value,
    });

    await AccountServices.subValue(value, debitedAccountId);
    await AccountServices.addValue(value, creditedAccountId);

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
