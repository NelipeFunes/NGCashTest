import { NextFunction, Response } from 'express';
import { Jwt, verify } from 'jsonwebtoken';
import { IReqUser } from '../interfaces';
import UserService from '../services/user.services';
import { ErrorHandler } from './errorMiddleware';

const secret = process.env.JWT_SECRET || 'jwtsecret';
const NOT_FOUND = 'Token not found';
const INVALID_TOKEN = 'Must be a valid token';

const tokenMiddleware = async (req: IReqUser, res:Response, next: NextFunction) => {
  console.log(req);
  
  const { authorization: auth } = req.headers;
  if (!auth) {
    throw new ErrorHandler(NOT_FOUND, 404);
  }

  let data: Jwt;
  try { data = verify(auth, secret, { complete: true }) as Jwt; } catch (e) {
    throw new ErrorHandler(INVALID_TOKEN, 401);
  }
  const { username, id, accountId }: any = data.payload;

  if (!username || !id || !accountId) {
    throw new ErrorHandler(INVALID_TOKEN, 401);
  }

  await UserService.getByUsername(username);

  req.user = { id, username, accountId };

  next();
};

export default tokenMiddleware;
