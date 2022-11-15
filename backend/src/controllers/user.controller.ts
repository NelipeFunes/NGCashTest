import { Request, Response } from "express";
import UserService from "../services/user.services"

const UserController = {
  async getUsers(req: Request, res: Response) {
    const users = await UserService.getUsers();
    res.status(200).json(users)
  },

  async registerUser(req: Request, res: Response) {
    const user = await UserService.registerUser(req.body);
    return res.status(201).json(user)
  }
};

export default UserController