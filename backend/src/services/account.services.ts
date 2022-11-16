/* eslint-disable @typescript-eslint/comma-dangle */
import { ErrorHandler } from '../middlewares/errorMiddleware';
import Account from '../database/models/Account.model';

const NOT_FOUND = 'Account not found';

const AccountServices = {
  async createAccount() {
    const account = await Account.create({ balance: 100 });
    return account.id;
  },

  async getAccount(id: number) {
    const account = await Account.findOne({ where: { id } });
    if (!account) {
      throw new ErrorHandler(NOT_FOUND, 404);
    }
    return account;
  },

  async addValue(value: number, id: number) {
    const account = await Account.findOne({ where: { id } });
    if (!account) throw new ErrorHandler(NOT_FOUND, 404);
    await Account.update(
      { balance: account.balance + value },
      { where: { id } }
    );
  },

  async subValue(value: number, id: number) {
    const account = await Account.findOne({ where: { id } });
    if (!account) throw new ErrorHandler(NOT_FOUND, 404);
    await Account.update(
      { balance: account.balance - value },
      { where: { id } }
    );
  },
};

export default AccountServices;
