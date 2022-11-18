import React, { useState, useEffect } from "react";
import { userApi }  from '../services/index'
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {

  const MISSFIELDS = 'missing fields';
  const USERMINLEN = 'username must be at least 3 characters';
  const PASSMINLEN = 'password must be at least 8 characters';
  const PASSCOMPLE = 'password does not meet the complexity requirements';
  const UNIQUEUSER = 'Username must be unique';

  const navigate = useNavigate();

  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [btnState, setBtnState] = useState(true);

  const registerUser = async () => {
    const res = await userApi(username, password, 'register');
    if (
      res !== MISSFIELDS && 
      res !== USERMINLEN && 
      res !== PASSMINLEN && 
      res !== PASSCOMPLE &&
      res !== UNIQUEUSER
      ) {
      localStorage.removeItem('token');
      localStorage.setItem('token', res);
      navigate('/dashboard');
    } else {
      alert(res);
    };
  }

  useEffect(() => {
    const checkEmailAndPassword = () => {
      const regex = /^(?=.*[0-9])(?=.*[A-Z]).{8,}$/;
      const validPass = regex.test(password);
      if (username.length < 3 || !validPass) {
        setBtnState(true)
      } else {
        setBtnState(false)
      }
      
    };
    checkEmailAndPassword();
  }, [username, password]);
  
  return (
    <div>
       <div>
        <div>
          <h3>Sign up</h3>
          <span>Enter your credentials to continue</span>
        </div>
        <div>
          <span>Username: </span>
          <input type="text" value={ username } onChange={({ target }) => setUser(target.value)} />
          <span>Password: </span>
          <input type="password" value={ password } onChange={({ target }) => setPass(target.value)} />
          <button type="button" disabled={ btnState } onClick={() => registerUser()}>Sing Up</button>
        </div>
        <div>
          <button type="button" onClick={() => navigate('/')}>Already have an account?</button>
        </div>
      </div>
    </div>
  );
};