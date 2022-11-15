import { ErrorHandler } from './../middlewares/errorMiddleware';
import User from "../database/models/User.model"
import IUser from '../interfaces/IUser';
import AccountServices from './account.services';

const UserService = {
  validateBody(username: string, password:string) {
    const rgx = /^(?=.*[0-9])(?=.*[A-Z]).{8,}$/
    const passwordTest = rgx.test(password)
    if (!username || !password) {
      throw new ErrorHandler('missing fields', 400)
    }

    if (username.length < 3) {
      throw new ErrorHandler('username must be 3 characters', 401);
    }

    if (password.length < 8) {
      throw new ErrorHandler('passowrd must be 8 characters', 401);
    }

    if (!passwordTest) {
      throw new ErrorHandler('invalid password', 401);
    }
  },

  async getUsers() {
    const users = await User.findAll();
    return users;
  },

  async registerUser({ username, password }: IUser) {
    this.validateBody(username, password);
    const accountId = await AccountServices.createAccount();
    const user = await User.create({ username, password, accountId });
    return user;
  },
}
export default UserService