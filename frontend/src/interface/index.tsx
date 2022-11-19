export interface LoginResponse {
  data: IData
}

export interface IData {
  jwt: string
}

interface IAccount {
  id: number;
  username: string;
  accountId: number;
}

export interface TransactionsRes {
  id: number;
  debitedAccount: IAccount;
  creditedAccount: IAccount;
  value: string;
  createdAt: string
}

export interface ISideBar {
  username: string;
  balance: string;
  date: string;
  debBtn: boolean;
  credBtn: boolean
  logoff: () => void;
  setDate: (date:string) => void;
  setDebBtn: (bool:boolean) => void
  setCredBtn: (bool:boolean) => void
  setDateBtn: (bool:boolean) => void
  filterTransactions: () => TransactionsRes[] | any
}

