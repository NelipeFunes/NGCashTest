import { Router } from 'express';
import UserController from '../controllers/user.controller';

const UserRouter = Router();

UserRouter.route('/').get(UserController.getUsers);
UserRouter.route('/register').post(UserController.registerUser);
UserRouter.route('/login').post(UserController.login);
UserRouter.route('/:id').get(UserController.getById);

export default UserRouter;
