import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { 
  getAccount, getCreditedTransactionsDated, getDebitedTransactionsDated, 
  getTransactions, getTransactionsCredited, getTransactionsDated, getTransactionsDebited, 
  getUsernames, 
  makeTransfer } from "../services";
import './Dashboard.page.css'

import SideBar from "../components/Sidebar";
import TransactionsTable from "../components/Table";

export default function Dashboard() {
  const [balance, setBalance] = useState('');
  const [username, setUser] = useState('');
  const [token, setToken] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [credBtn, setCredBtn] = useState(false);
  const [debBtn, setDebBtn] = useState(false);
  const [dateBtn, setDateBtn] = useState(false);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [value, setValue] = useState(0);
  const [users, setUsers] = useState([])

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

    const getNames = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Token not found');
        return navigate('/');
      };
      const res = await getUsernames(token);
      if (res === 'Must be a valid token') {
        alert('Not valid token, redirecting to login page');
        return navigate('/');
      }
      setUsers(res)
    };
    
    getInfos();
    getNames();
  }, []);

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
    confirmAlert({
      message: 'Confirm logoff',
      buttons: [
        { label: 'Yes', onClick:() => { localStorage.removeItem('token');return navigate('/') } }, { label: 'No' }
      ]
    })
  }

  const realizeTransfer = async () => {
    const user = localStorage.getItem('userTrans');
    if (!user) {
      return confirmAlert({
        title: 'Error',
        message: 'Cash-in account not selected',
        buttons: [{ label: 'Ok' }]
      });
    }
    const transferFunc = async () => {
      const res = await makeTransfer(token, user, value);
      if (res === 'insufficient funds') {
        confirmAlert({
          title: 'Error',
          message: 'Insufficient funds',
          buttons: [{ label: 'Ok' }]
        });
      }
      if (res === 'value must be greater than 0') {
        confirmAlert({
          title: 'Error',
          message: 'Value must be greater than 0',
          buttons: [{ label: 'Ok' }]
        });
      }
    
    await getBalance(token);
    await getTransFromDB(token)
    }
    const text = `Are you sure you want to make a transfer to ${user}, in the value of R$ ${Number(value).toFixed(2)}?`;
    confirmAlert({
      title: 'Confirmation',
      message: text,
      buttons: [
        {
          label: 'Yes',
          onClick: () => transferFunc(),
        },
        {
          label: 'No',
        }
      ]
    });
  }

  return (
    <div>
      <nav>
        <SideBar 
          username={username}
          balance={balance}
          date={date}
          credBtn={credBtn}
          debBtn={debBtn}
          data={users}
          setDate={setDate}
          logoff={logOff}
          setCredBtn={setCredBtn}
          setDebBtn={setDebBtn}
          setDateBtn={setDateBtn}
          setValue={setValue}
          filterTransactions={filterTransactions}
          realizeTransfer={realizeTransfer}
        />
      </nav>
      <div className="Transactions">
          { transactions.length === 0 ? 'No transactions have been found' 
            : <TransactionsTable  transactions={transactions}/> }
      </div>
    </div>
  )
}