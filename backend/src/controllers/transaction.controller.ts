import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ErrorHandler } from '../middlewares/errorMiddleware';
import TransactionServices from '../services/transaction.services';

const secret = process.env.JWT_SECRET || 'jwtsecret';
const NOT_FOUND = 'Token not found';
const INVALID_TOKEN = 'Must be a valid token';

const TransactionController = {
  async createTransaction(req: Request, res: Response) {
    const { authorization: auth } = req.headers;
    if (!auth) {
      throw new ErrorHandler(NOT_FOUND, 404);
    }
    try {
      verify(auth, secret);
    } catch (error) {
      throw new ErrorHandler(INVALID_TOKEN, 401);
    }
    const transaction = await TransactionServices.createTransaction(req.body);
    return res.status(201).json(transaction);
  },

  async getAllTransactions(req: Request, res: Response) {
    const { authorization: auth } = req.headers;
    if (!auth) {
      throw new ErrorHandler(NOT_FOUND, 404);
    }
    try {
      verify(auth, secret);
    } catch (error) {
      throw new ErrorHandler(INVALID_TOKEN, 401);
    }
    const transactions = await TransactionServices.getAllTransactions();
    return res.status(200).json(transactions);
  },

  async getTransactionsById(req: Request, res: Response) {
    const { authorization: auth } = req.headers;
    if (!auth) {
      throw new ErrorHandler(NOT_FOUND, 404);
    }
    try {
      verify(auth, secret);
    } catch (error) {
      throw new ErrorHandler(INVALID_TOKEN, 401);
    }
    const { id } = req.params;
    const transactions = await TransactionServices.getTransactionsById(+id);
    return res.status(200).json(transactions);
  },
};

export default TransactionController;
