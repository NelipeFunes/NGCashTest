import { Request, Response } from "express";
import { compare } from 'bcryptjs'
import UserService from "../services/user.services"
import Token from "../utils/token";

const UserController = {
  async getUsers(_req: Request, res: Response) {
    const users = await UserService.getUsers();
    res.status(200).json(users)
  },

  async registerUser(req: Request, res: Response) {
    const user = await UserService.registerUser(req.body);
    return res.status(201).json(user);
  },

  async login(req: Request, res: Response) {
    const user = await UserService.login(req.body);
    const JWT = Token.makeToken(user);
    return res.status(200).json({ JWT });
  }
};

export default UserController