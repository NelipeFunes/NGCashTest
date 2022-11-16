export default interface ITransaction {
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
}
