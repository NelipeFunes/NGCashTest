/* eslint-disable @typescript-eslint/comma-dangle */
import { ErrorHandler } from '../middlewares/errorMiddleware';
import Account from '../database/models/Account.model';

const NOT_FOUND = 'Account not found';

const AccountServices = {
  async createAccount() {
    const account = await Account.create({ balance: 100 });
    return account.id;
  },

  async getAccountById(id: number) {
    const account = await Account.findOne({ where: { id } });
    if (!account) {
      throw new ErrorHandler(NOT_FOUND, 404);
    }
    return account;
  },

  async addValue(value: string, id: number) {
    const account = await Account.findOne({ where: { id } });
    if (!account) throw new ErrorHandler(NOT_FOUND, 404);
    const newBalance = Number(account.balance) + Number(value);
    await Account.update(
      { balance: newBalance },
      { where: { id } }
    );
  },

  async subValue(value: string, id: number) {
    const account = await Account.findOne({ where: { id } });
    if (!account) throw new ErrorHandler(NOT_FOUND, 404);
    const newBalance = Number(account.balance) - Number(value);
    await Account.update(
      { balance: newBalance },
      { where: { id } }
    );
  },

};

export default AccountServices;
