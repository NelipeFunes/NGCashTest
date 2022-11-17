import { Router } from 'express';
import UserController from '../controllers/user.controller';
import tokenMiddleware from '../middlewares/tokenMiddleware';

const UserRouter = Router();

UserRouter.route('/register').post(UserController.registerUser);
UserRouter.route('/login').post(UserController.login);
UserRouter.route('/').get(tokenMiddleware, UserController.getById);

export default UserRouter;
