import { compare, hash } from 'bcryptjs';
import { ErrorHandler } from '../middlewares/errorMiddleware';
import User from '../database/models/User.model';
import { IUser } from '../interfaces';
import AccountServices from './account.services';
import { password } from '../database/config/database';

const NOT_FOUND = 'User not found';

const UserService = {
  normalizeUser(username:string) {
    return username.toLowerCase().trim();
  },

  validateBody(username: string, password: string) {
    const rgx = /^(?=.*[0-9])(?=.*[A-Z]).{8,}$/;
    const passwordTest = rgx.test(password);
    if (!username || !password) {
      throw new ErrorHandler('missing fields', 400);
    }

    if (username.length < 3) {
      throw new ErrorHandler('username must be at least 3 characters', 401);
    }

    if (password.length < 8) {
      throw new ErrorHandler('password must be at least 8 characters', 401);
    }

    if (!passwordTest) {
      throw new ErrorHandler('password does not meet the complexity requirements', 401);
    }
  },

  async registerUser({ username, password }: IUser) {
    this.validateBody(username, password);
    const userLow = this.normalizeUser(username);
    const exist = await User.findOne({
      where: { username: userLow },
    });
    if (exist) {
      throw new ErrorHandler('Username must be unique', 401);
    }

    const accountId = await AccountServices.createAccount();
    const hashedPassword = await hash(password, 10);
    const user = await User.create({
      username: userLow,
      password: hashedPassword,
      accountId,
    });
    return { id: user.id, username: user.username, accountId: user.accountId };
  },

  async login({ username, password }: IUser) {
    const userLow = this.normalizeUser(username);
    const user = await User.findOne({ where: { username: userLow } });
    if (!user) throw new ErrorHandler(NOT_FOUND, 404);
    const validatePassword = await compare(password, user.password);
    if (!validatePassword) throw new ErrorHandler('Invalid password', 400);
    return {
      id: user.id,
      username: user.username,
      accountId: user.accountId,
    };
  },

  async getByUsername(username: string) {
    const userLow = this.normalizeUser(username);
    const user = await User.findOne({
      attributes: {
        exclude: [ 'password' ],
      },
      where: { username: userLow } 
    } );
    if (!user) {
      throw new ErrorHandler(NOT_FOUND, 404);
    }
    return user;
  },

  async getById(id: number) {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new ErrorHandler(NOT_FOUND, 404);
    }
    const account = await AccountServices.getAccountById(user.accountId);

    return {
      id: account.id,
      username: user.username,
      balance: account.balance,
    };
  },

  async getUsernames(username:string) {
    const users = await User.findAll();
    const mappedUsers = users.map((user) => user.username);
    return mappedUsers.filter((name) => name !== username);
  }
};

export default UserService;
