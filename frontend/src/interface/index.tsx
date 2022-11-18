export interface LoginResponse {
  data: IData
}

export interface IData {
  jwt: string
}

export interface ITransaction {
  id: number,
  debitedAccountId: number,
  creditedAccountId: number,
  value: string,
  createdAt: string
}

interface IAccount {
  id: number;
  username: string;
  accountId: number;
}

export interface TranssactionsRes {
  id: number;
  debitedAccount: IAccount;
  creditedAccount: IAccount;
  value: string;
  createdAt: string
}

