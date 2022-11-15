import { Router } from "express";
import UserController from "../controllers/user.controller";

const UserRouter = Router();

UserRouter.route('/').get(UserController.getUsers)
UserRouter.route('/register').post(UserController.registerUser)

export default UserRouter