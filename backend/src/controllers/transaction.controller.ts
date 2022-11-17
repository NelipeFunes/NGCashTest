import { Response } from 'express';
import { ErrorHandler } from '../middlewares/errorMiddleware';
import { IReqUser } from '../interfaces';
import TransactionServices from '../services/transaction.services';

const TransactionController = {
  async createTransaction(req: IReqUser, res: Response) {
    if (!req.user) {
      throw new ErrorHandler('Invalid token', 401);
    }

    const transaction = await TransactionServices
      .createTransaction(req.body, Number(req.user?.accountId));
    return res.status(201).json(transaction);
  },

  async getTransactionsById(req: IReqUser, res: Response) {
    if (!req.user) {
      throw new ErrorHandler('Invalid token', 401);
    }
    const transactions = await TransactionServices.getTransactionsById(Number(req.user.accountId));
    return res.status(200).json(transactions);
  },

  async getCreditedTransactions(req: IReqUser, res: Response) {
    const transactions = await TransactionServices
      .getCreditedTransactions(Number(req.user?.accountId));
    return res.status(200).json(transactions);
  },

  async getDebitedTransactions(req: IReqUser, res: Response) {
    const transactions = await TransactionServices
      .getDebitedTransactions(Number(req.user?.accountId));
    return res.status(200).json(transactions);
  },

  async getDatedTransactions(req: IReqUser, res: Response) {
    const transactions = await TransactionServices
      .getDatedTransactions(req.body.date, Number(req.user?.accountId));
    return res.status(200).json(transactions);
  },
};

export default TransactionController;
