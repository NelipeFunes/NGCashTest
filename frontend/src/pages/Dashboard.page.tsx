import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { TranssactionsRes } from "../interface";
import { getAccount, getTransactions, getTransactionsCredited, getTransactionsDated, getTransactionsDebited } from "../services";

export default function Dashboard() {
  const [balance, setBalance] = useState('');
  const [username, setUser] = useState('');
  const [token, setToken] = useState('')
  const [transactions, setTransactions] = useState([]);
  const [credBtn, setCredBtn] = useState(false);
  const [debBtn, setDebBtn] = useState(false);
  const [dateBtn, setDateBtn] = useState(false);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

  const navigate = useNavigate();

  const getTransFromDB = async (token: string) => {
    const res = await getTransactions(token);
    if (res === 'Must be a valid token') {
      alert('Not valid token, redirecting to login page');
      return navigate('/');
    }
    if (res === 'No transaction has been found') {
      return null
    }
    setTransactions(res)
  }

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

  useEffect(() => {

    const getInfos = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Token not found');
        return navigate('/');
      };
      setToken(token);
      await getTransFromDB(token);
      await getBalance(token);
    }
    
    getInfos();
  }, []);

  const renderTransactions = () => {
    const normalizeName = (name: string) =>  name[0].toUpperCase() + name.substring(1);
    if (transactions.length < 1) {
      return 'No transactions have been found';
    }
    const arara = transactions.map((transaction: TranssactionsRes) => 
    <div key={transaction.id}>
      <span>{`From: ${normalizeName(transaction.debitedAccount.username)}`}</span>
      <br />
      <span>{`To: ${normalizeName(transaction.creditedAccount.username)}`}</span>
      <br />
      <span>{`Value: ${transaction.value}`}</span>
      <br />
      <span>{`Fullfilled: ${transaction.createdAt}`}</span>
    </div>
    )
    return arara;
  }

  const filterTransactions = async () => {
    if (credBtn === true) {
      const transactions = await getTransactionsCredited(token);
      if (transactions === 'No transaction has been found') {
        return setTransactions([])
      };
      return setTransactions(transactions)
    };

    if (debBtn === true) {
      const transactions = await getTransactionsDebited(token);
      if (transactions === 'No transaction has been found') {
        return setTransactions([])
      };
      return setTransactions(transactions)
    };

    if (dateBtn === true) {
      const transactions = await getTransactionsDated(token, date);
      if (transactions === 'No transaction has been found') {
        return setTransactions([])
      };
      return setTransactions(transactions)
    }

    return await getTransFromDB(token)

  };

  const logOff = () => {
    localStorage.clear();
    return navigate('/');
  }

  return (
    <div>
      <div>
        <span>{`${username}`}</span>
      </div>
      <div>
        <span>{`R$ ${balance}`}</span>
      </div>
      <div>
        <span>Filters: </span>
        <label>
          <input type="checkbox"  checked={debBtn} onChange={({ target }) => {setDebBtn(target.checked);setCredBtn(!target.value);setDateBtn(!target.value)}} />
          <span>You sent</span>
        </label>
        <label>
          <input type="checkbox" checked={credBtn} onChange={({ target }) => {setCredBtn(target.checked); setDebBtn(!target.value); setDateBtn(!target.value)}}/>
          <span>You received</span>
        </label>
        <label>
          <input type="checkbox" checked={dateBtn} onChange={(({target}) => {setDateBtn(target.checked);setDebBtn(!target.value);setCredBtn(!target.value)})}/>
          <span>By date: </span>
        </label>
          <input type="date" value={date} onChange={({target}) => setDate(target.value)} />
        
        <button type="button" onClick={() => filterTransactions()}>Filter</button>
       { renderTransactions() }
      </div>
      <button type="button" onClick={() => logOff()}>Logoff</button>
    </div>
  )
}