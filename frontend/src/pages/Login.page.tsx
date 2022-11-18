import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import { useNavigate } from "react-router-dom";
import { userApi } from "../services";
import "./Login.page.css"


export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [btnState, setBtnState] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);
  const [rememberBtn, setRememberBtn] = useState(false)

  
  const rememberMeBtn = () => {
    const btn = document.getElementById('rememberBtn') as HTMLInputElement;
    if (btn.checked === false) {
      localStorage.removeItem('userInfos')
    } else {
      localStorage.removeItem('userInfos');
      const obj = {
        username, 
        password,
        rememberMeBtn: true,
      };
      localStorage.setItem('userInfos', JSON.stringify(obj));
    };
  };

  const logIn = async () => {
    const res = await userApi(username, password, 'login');
    if (res !== 'Invalid password' && res !== 'User not found') {
      alert('Logged in successfully');
      localStorage.removeItem('token')
      localStorage.setItem('token', res);
      rememberMeBtn();
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

  useEffect(() => {
    const checkRememberBtn = () => {
      const infos = localStorage.getItem('userInfos');
      if (!infos) {
        return null;
      } else {
        const obj = JSON.parse(infos);
        setUser(obj.username);
        setPass(obj.password);
        setRememberBtn(obj.rememberMeBtn);
      }
    }
    localStorage.removeItem('token');
    checkRememberBtn();
  }, [])

  return (
    <div>
       <div>
        <div>
          <h3>Hi, Welcome Back</h3>
          <span>Enter your credentials to continue</span>
        </div>
        <div>
          <InputLabel>
            <span>Username: </span>
            <Input type="text" value={username} onChange={({ target }) => setUser(target.value)} />
          </InputLabel>
          <InputLabel>
            <span>Password: </span>
            <Input
              type={passwordShown ? "text" : "password"}
              onChange={({ target }: any) => setPass(target.value)}
              value= { password }
              endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setPasswordShown(!passwordShown)}
                >
                  {passwordShown ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
              }
            />
          </InputLabel>
          <button type="button" disabled={btnState} onClick={() => logIn()}>Login</button>
          <label>
            <input type="checkbox" id="rememberBtn" checked={rememberBtn} onChange={ ({ target }) => setRememberBtn(target.checked) }/>
            <span>Remember me</span>
          </label>
        </div>
        <div>
          <button type="button" onClick={() => navigate('/register')}>Don't have an account?</button>
        </div>
      </div>
    </div>
  );
};