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

async function getTransactionsCredited(authorization: string) {
  try {
    const { data } = await api.get('/transactions/credited', {
      headers: { authorization },
    });
    return data
  } catch (error: any) {
    const { response: { data: { message } } } = error
    return message
  };
};

async function getTransactionsDebited(authorization: string) {
  try {
    const { data } = await api.get('/transactions/debited', {
      headers: { authorization },
    });
    return data
  } catch (error: any) {
    const { response: { data: { message } } } = error
    return message
  };
};

async function getTransactionsDated(authorization: string, date:string) {
  try {
    const { data } = await api.post('/transactions/dated', { date }, {
      headers: { authorization },
    });
    return data
  } catch (error: any) {
    const { response: { data: { message } } } = error
    return message
  };
};

async function getCreditedTransactionsDated(authorization: string, date:string) {
  try {
    const { data } = await api.post('/transactions/dated/credited', { date }, {
      headers: { authorization },
    });
    return data
  } catch (error: any) {
    const { response: { data: { message } } } = error
    return message
  };
};

async function getDebitedTransactionsDated(authorization: string, date:string) {
  try {
    const { data } = await api.post('/transactions/dated/debited', { date }, {
      headers: { authorization },
    });
    return data
  } catch (error: any) {
    const { response: { data: { message } } } = error
    return message
  };
};

async function getUsernames(authorization:string) {
  try {
    const { data } = await api.get('/users/names',{
      headers: { authorization },
    });
    return data;
  } catch (error: any) {
    const { response: { data: { message } } } = error;
    return message;
  }
}

const makeTransfer = async (authorization: string, username:string, value:number) => {
  try {
    const { data: { accountId } } = await api.post('/users/',{ username },{
      headers: { authorization },
    });
    const { data } = await api.post('/transactions/create', { creditedAccountId: accountId, value }, {
      headers: { authorization },
    });
    
    return data;
  } catch (error: any) {
    const { response: { data: { message } } } = error;
    return message;
  }
}

export {
  userApi,
  getAccount,
  getTransactions,
  getTransactionsCredited,
  getTransactionsDebited,
  getTransactionsDated,
  getCreditedTransactionsDated,
  getDebitedTransactionsDated,
  getUsernames,
  makeTransfer,
}