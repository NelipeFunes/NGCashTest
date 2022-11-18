/* eslint-disable @typescript-eslint/comma-dangle */
import { Router } from 'express';
import TransactionController from '../controllers/transaction.controller';
import tokenMiddleware from '../middlewares/tokenMiddleware';

const TransactionRouter = Router();

TransactionRouter.route('/create')
  .post(tokenMiddleware, TransactionController.createTransaction,);
TransactionRouter.route('/credited')
  .get(tokenMiddleware, TransactionController.getCreditedTransactions);
TransactionRouter.route('/debited')
  .get(tokenMiddleware, TransactionController.getDebitedTransactions);
TransactionRouter.route('/dated')
  .post(tokenMiddleware, TransactionController.getDatedTransactions);
TransactionRouter.route('/dated/credited')
  .post(tokenMiddleware, TransactionController.getDatedCreditedTrans);
TransactionRouter.route('/dated/debited')
  .post(tokenMiddleware, TransactionController.getDatedDebitedTrans);
TransactionRouter.route('/')
  .get(tokenMiddleware, TransactionController.getTransactionsById);

export default TransactionRouter;
