import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getUsernames } from '../services';
import { useNavigate } from 'react-router-dom';

export default function ComboBox() {
  const [users, setUsers] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
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
    getNames();
  }, []);

  const saveUserTrans = ({ target }: any) => {
    if (target.innerHTML.length > 15) {
      return localStorage.removeItem('userTrans');
    }

    localStorage.setItem('userTrans', target.innerHTML);
  }

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={users}
      onChange={ (e) => saveUserTrans(e) }
      sx={
        { width: 300, marginTop:3 }
      }
      renderInput={(params) => <TextField {...params} label="Username" />}
    />
  );
}