/* eslint-disable @typescript-eslint/comma-dangle */
import { Router } from 'express';
import TransactionController from '../controllers/transaction.controller';

const TransactionRouter = Router();

TransactionRouter.route('/create').post(
  TransactionController.createTransaction
);

TransactionRouter.route('/').get(TransactionController.getAllTransactions);

TransactionRouter.route('/:id').get(TransactionController.getTransactionsById);

export default TransactionRouter;
