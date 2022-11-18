import { Request } from 'express';

interface IToken {
  id: number;
  username: string;
  accountId: number;
}

export interface IReqUser extends Request {
  user?: IToken
}

export interface ITransaction {
  debitedAccountId: number;
  creditedAccountId: number;
  value: string;
}

export interface IUser {
  username: string;
  password: string;
}

interface IAccount {
  id: number;
  username: string;
  balance: string;
}

export interface TranssactionsRes {
  id: number;
  debitedAccount: IAccount;
  creditedAccount: IAccount;
  value: string;
  createdAt: string
}
