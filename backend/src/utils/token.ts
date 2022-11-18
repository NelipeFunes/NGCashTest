import { sign } from 'jsonwebtoken';

interface IPayload {
  id: number;
  username: string;
  accountId: number;
}

const secret = process.env.JWT_SECRET || 'jwtsecret';

const Token = {
  makeToken({ id, username, accountId }: IPayload) {
    const token = sign({ id, username, accountId }, secret, {
      expiresIn: '1h',
    });
    return token;
  },
};

export default Token;
