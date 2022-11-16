import { ErrorHandler } from './../middlewares/errorMiddleware';
import Account from "../database/models/Account.model";


const AccountServices = {
  async createAccount() {
    const account = await Account.create({ balance: 100 });
    return account.id;
  },

  async getAccount(id: number) {
    const account = await Account.findOne({ where: { id } });
    if (!account) {
      throw new ErrorHandler('Account not found', 404)
    }
    return account;
  }
}

export default AccountServices