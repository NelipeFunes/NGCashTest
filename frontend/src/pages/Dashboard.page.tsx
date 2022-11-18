import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ITransaction } from "../interface";
import { getAccount, getTransactions } from "../services";

export default function Dashboard() {
  const [balance, setBalance] = useState('');
  const [username, setUser] = useState('');
  const [transactions, setTransactions] = useState([])

  const navigate = useNavigate();

  
  useEffect(() => {
  
    const getBalance = async (token: string) => {
      const res = await getAccount(token);
      if (res === 'Must be a valid token') {
        alert('Not valid token, redirecting to login page');
        navigate('/');
      }
      const username = res.username[0].toUpperCase() + res.username.substring(1)
      setBalance(res.balance);
      setUser(username);
    }

    const getTransFromDB = async (token: string) => {
      const res = await getTransactions(token);
      if (res === 'Must be a valid token') {
        alert('Not valid token, redirecting to login page');
        return navigate('/');
      }
      setTransactions(res)
    }

    const getInfos = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/');
      await getTransFromDB(token);
      await getBalance(token);
    }
    
    getInfos();
  }, [])
  return (
    <div>
      <div>
        <span>{`${username}`}</span>
      </div>
      <div>
        <span>{`R$ ${balance}`}</span>
      </div>
      <div>
       
      </div>
    </div>
  )
}