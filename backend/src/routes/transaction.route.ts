/* eslint-disable @typescript-eslint/comma-dangle */
import { Router } from 'express';
import TransactionController from '../controllers/transaction.controller';
import tokenMiddleware from '../middlewares/tokenMiddleware';

const TransactionRouter = Router();

TransactionRouter.route('/create').post(
  tokenMiddleware,
  TransactionController.createTransaction
);

TransactionRouter.route('/').get(tokenMiddleware, TransactionController.getAllTransactions);

TransactionRouter.route('/:id').get(TransactionController.getTransactionsById);

export default TransactionRouter;
