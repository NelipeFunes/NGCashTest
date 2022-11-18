import { Request, Response } from 'express';
import { ErrorHandler } from '../middlewares/errorMiddleware';
import { IReqUser } from '../interfaces';
import UserService from '../services/user.services';
import Token from '../utils/token';

const UserController = {

  async registerUser(req: Request, res: Response) {
    const user = await UserService.registerUser(req.body);
    const token = Token.makeToken(user);
    return res.status(201).json({ jwt: token });
  },

  async login(req: Request, res: Response) {
    const user = await UserService.login(req.body);
    const token = Token.makeToken(user);
    return res.status(200).json({ jwt: token });
  },

  async getById(req: IReqUser, res: Response) {
    if (!req.user) {
      throw new ErrorHandler('Invalid token', 401);
    }
    const user = await UserService.getById(Number(req.user?.id));
    return res.status(200).json(user);
  },

  async getByUsername(req: IReqUser, res: Response) {
    const user = await UserService.getByUsername(req.body.username);
    return res.status(200).json(user);
  },

  async getUsernames(req: IReqUser, res: Response) {
    if (!req.user) {
      throw new ErrorHandler('Invalid token', 401);
    }
    const users = await UserService.getUsernames(req.user?.username);
    return res.status(200).json(users);
  },
};

export default UserController;
