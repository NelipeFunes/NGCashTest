import { Request, Response } from 'express';
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

  async getAllTransactions(req: Request, res: Response) {
    const transactions = await TransactionServices.getAllTransactions();
    return res.status(200).json(transactions);
  },

  async getTransactionsById(req: Request, res: Response) {
    const { id } = req.params;
    const transactions = await TransactionServices.getTransactionsById(+id);
    return res.status(200).json(transactions);
  },
};

export default TransactionController;
