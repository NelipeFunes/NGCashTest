import { TranssactionsRes } from './../interfaces/index';
/* eslint-disable max-lines-per-function */
import { Op } from 'sequelize';
import { ITransaction } from '../interfaces/index';
import Transaction from '../database/models/Transaction.model';
import { ErrorHandler } from '../middlewares/errorMiddleware';
import AccountServices from './account.services';
import UserService from './user.services';

const NOT_FOUND = 'No transaction has been found';

const TransactionServices = {

  validateTransaction(
    {
      creditedAccountId,
      debitedAccountId,
      value }: ITransaction,
    accountId: number,
  ) {
    if (!creditedAccountId || !debitedAccountId || !value) {
      throw new ErrorHandler('missing fields', 401);
    }

    if (Number(value) < 1) throw new ErrorHandler('value must be greater than 0', 401);

    if (debitedAccountId !== accountId) {
      throw new ErrorHandler('You cannot use money from other account', 401);
    }

    if (debitedAccountId === creditedAccountId) {
      throw new ErrorHandler('An account cannot send money to itself', 401);
    }
  },

  async createTransaction({
    debitedAccountId, creditedAccountId, value,
  }: ITransaction, accountId: number) {
    const user1 = await AccountServices.getAccountById(debitedAccountId);

    this.validateTransaction({
      debitedAccountId, creditedAccountId, value,
    }, accountId);

    if (Number(user1.balance) < Number(value)) {
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

  async getTransactionsById(id: number) {
    const transactions = await Transaction.findAll({
      where: {
        [Op.or]: [{ creditedAccountId: id }, { debitedAccountId: id }],
      },
    });

    if (transactions.length === 0) {
      throw new ErrorHandler(NOT_FOUND, 404);
    }

    const mappedTransactions = await Promise.all(transactions
      .map(async ({id, value, createdAt, creditedAccountId, debitedAccountId}) => {
        const {id: debId, username} = await UserService
          .getById(debitedAccountId);
        const {id: creId, username: username2}= await UserService
          .getById(creditedAccountId);
        const obj = {
          id,
          value,
          debitedAccount: { id: debId, username, accountId: debitedAccountId },
          creditedAccount: { id: creId, username: username2, accountId: creditedAccountId },
          createdAt,
        }
        return obj;
    }));
    return mappedTransactions
  },

  async getCreditedTransactions(id: number) {
    const transactions: TranssactionsRes[] | any = await this.getTransactionsById(id);

    const creditedTransactions = transactions.filter(
      (transaction: TranssactionsRes) => Number(transaction.creditedAccount.id) === id,
    );

    if (creditedTransactions.length === 0) {
      throw new ErrorHandler(NOT_FOUND, 404);
    }

    return creditedTransactions;
  },

  async getDebitedTransactions(id: number) {
    const transactions: TranssactionsRes[] | any  = await this.getTransactionsById(id);

    const debitedTransactions = transactions.filter(
      (transaction: TranssactionsRes) => Number(transaction.debitedAccount.id) === id,
    );

    if (debitedTransactions.length === 0) {
      throw new ErrorHandler(NOT_FOUND, 404);
    }
    return debitedTransactions;
  },

  async getDatedTransactions(date: string, id: number) {
    const transactions = await Transaction.findAll({
      where: {
        [Op.or]: [{ creditedAccountId: id }, { debitedAccountId: id }],
        createdAt: date,
      },
    });

    if (transactions.length === 0) {
      throw new ErrorHandler(NOT_FOUND, 404);
    };
    const mappedTransactions = await Promise.all(transactions
      .map(async ({id, value, createdAt, creditedAccountId, debitedAccountId}) => {
        const {id: debId, username} = await UserService
          .getById(debitedAccountId);
        const {id: creId, username: username2}= await UserService
          .getById(creditedAccountId);
        const obj = {
          id,
          value,
          debitedAccount: { id: debId, username, accountId: debitedAccountId },
          creditedAccount: { id: creId, username: username2, accountId: creditedAccountId },
          createdAt,
        }
        return obj;
    }));

    return mappedTransactions;
  },

  async getDatedCreditedTrans(date:string, id:number) {
    const transactions = await this.getDatedTransactions(date, id);
    const filteredTrans = transactions.filter((transaction) => 
      transaction.creditedAccount.accountId === id
    )
    return filteredTrans;
  },

  async getDatedDebitedTrans(date:string, id:number) {
    const transactions = await this.getDatedTransactions(date, id);
    const filteredTrans = transactions.filter((transaction) => 
      transaction.debitedAccount.accountId === id
    )
    return filteredTrans;
  }
};

export default TransactionServices;
