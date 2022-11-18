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