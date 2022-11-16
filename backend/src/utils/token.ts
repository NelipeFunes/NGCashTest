import { sign } from 'jsonwebtoken';

interface IPayload {
  id: number;
  username: string;
  password: string;
  accountId: number;
}

const secret = process.env.JWT_SECRET || 'jwtsecret';

const Token = {
  makeToken({ id, username, password, accountId }: IPayload) {
    const token = sign({ id, username, password, accountId }, secret, {
      expiresIn: '24h',
    });
    return token;
  },
};

export default Token;
