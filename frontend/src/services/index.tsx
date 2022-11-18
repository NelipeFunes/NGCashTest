import axios from 'axios'
import { LoginResponse } from '../interface';


const api = axios.create({
  baseURL: 'http://localhost:3010',
});


async function userApi(username: string, password: string, url: string) {
  try {
    const {data: { jwt }} = await api.post(`/users/${url}`, { username, password }) as LoginResponse
    return jwt
  } catch (error: any) {
    const { response: { data: { message } } } = error
    return message
  };
};

async function getAccount(authorization: string) {
  try {
    const { data } = await api.get('/users', {
      headers: { authorization },
    });
    return data
  } catch (error: any) {
    const { response: { data: { message } } } = error
    return message
  };
};

async function getTransactions(authorization: string) {
  try {
    const { data } = await api.get('/transactions', {
      headers: { authorization },
    });
    return data
  } catch (error: any) {
    const { response: { data: { message } } } = error
    return message
  };
};

export {
  userApi,
  getAccount,
  getTransactions,
}