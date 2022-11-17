import axios from 'axios'
import { LoginRes } from '../interface';


const api = axios.create({
  baseURL: 'http://localhost:3010',
});

const LoginFuncs = {
  async makeLogin(username: string, password: string):Promise<string> {
    try {
      const { jwt } = await api.post('/users/login', { username, password }) as LoginRes
      console.log(jwt);
      return jwt
    } catch (error: any) {
      console.log(error);
      return error
    };
  },
};

export default LoginFuncs