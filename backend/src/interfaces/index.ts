import { Request } from 'express';
import { Jwt } from 'jsonwebtoken';

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
}

export interface TranssactionsRes {
  id: number;
  debitedAccount: IAccount;
  creditedAccount: IAccount;
  value: number;
  createdAt: Date
}
