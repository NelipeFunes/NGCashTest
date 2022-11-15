import Account from "../database/models/Account.model";


const AccountServices = {
  async createAccount() {
    const account = await Account.create({ balance: 100 });
    return account.id;
  },
}

export default AccountServices