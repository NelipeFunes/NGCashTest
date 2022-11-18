import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { TranssactionsRes } from "../interface";
import ComboBox from '../components/AutoComplete'
import { getAccount, getCreditedTransactionsDated, getDebitedTransactionsDated, getTransactions, getTransactionsCredited, getTransactionsDated, getTransactionsDebited, getUsernames, makeTransfer } from "../services";
import './Dashboard.page.css'

export default function Dashboard() {
  const [balance, setBalance] = useState('');
  const [username, setUser] = useState('');
  const [value, setValue] = useState(0);
  const [token, setToken] = useState('');
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
    <div key={transaction.id} className="border">
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
    if (dateBtn === true && credBtn === true) {
      const transactions = await getCreditedTransactionsDated(token, date);
      if (transactions === 'No transaction has been found') {
        return setTransactions([]);
      };
      return setTransactions(transactions);
    }

    if (dateBtn === true && debBtn === true) {
      const transactions = await getDebitedTransactionsDated(token, date);
      if (transactions === 'No transaction has been found') {
        return setTransactions([]);
      };
      return setTransactions(transactions);
    }

    if (credBtn === true) {
      const transactions = await getTransactionsCredited(token);
      if (transactions === 'No transaction has been found') {
        return setTransactions([]);
      };
      return setTransactions(transactions);
    };

    if (debBtn === true) {
      const transactions = await getTransactionsDebited(token);
      if (transactions === 'No transaction has been found') {
        return setTransactions([]);
      };
      return setTransactions(transactions);
    };

    if (dateBtn === true) {
      const transactions = await getTransactionsDated(token, date);
      if (transactions === 'No transaction has been found') {
        return setTransactions([]);
      };
      return setTransactions(transactions);
    }

    return await getTransFromDB(token);

  };

  const logOff = () => {
    localStorage.clear();
    return navigate('/');
  }

  const realizeTransfer = async () => {
    const user = localStorage.getItem('userTrans');
    if (!user) {
      return alert('Cash-in account not selected')
    }
    const res = await makeTransfer(token, user, value);
    if (res === 'insufficient funds') {
      alert('Insuficient funds!')
    }
    if (res === 'value must be greater than 0') {
      alert('value must be greater than 0!')
    }
    
    await getBalance(token);
    await getTransFromDB(token)
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
          <input type="checkbox"  checked={debBtn} onChange={({ target }) => {setDebBtn(target.checked);setCredBtn(!target.value);}} />
          <span>Cash out</span>
        </label>
        <label>
          <input type="checkbox" checked={credBtn} onChange={({ target }) => {setCredBtn(target.checked); setDebBtn(!target.value); }} />
          <span>Cash in</span>
        </label>
        <label>
          <input type="checkbox" checked={dateBtn} onChange={(({target}) => setDateBtn(target.checked))} />
          <span>By date: </span>
        </label>
          <input type="date" value={date} onChange={({target}) => setDate(target.value)} />
        
        <button type="button" onClick={() => filterTransactions()}>Filter</button>
       { renderTransactions() }
      </div>
      <div className="border">
        <span>Send to: </span>
        <ComboBox />
        <span>Value: </span>
        <input type="number" value={ value } onChange={ ({ target }: any) => setValue(target.value)}  />
        <button onClick={() => realizeTransfer()}>Tranfer</button>
      </div>
      <button type="button" onClick={() => logOff()}>Logoff</button>
    </div>
  )
}