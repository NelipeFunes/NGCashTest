import axios from 'axios'
import { LoginResponse } from '../interface';


const api = axios.create({
  baseURL: 'http://localhost:3010',
});

const LoginFuncs = {
  async makeLogin(username: string, password: string) {
    try {
      const {data: { jwt }} = await api.post('/users/login', { username, password }) as LoginResponse
      return jwt
    } catch (error: any) {
      const { response:{ data: { message }} } = error
      return message
    };
  },
};

export default LoginFuncs