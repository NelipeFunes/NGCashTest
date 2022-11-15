import { Request, Response } from "express";
import UserService from "../services/user.services"

const UserController = {
  async getUsers(req: Request, res: Response) {
    const users = await UserService.getUsers();
    res.status(200).json(users)
  },
};

export default UserController