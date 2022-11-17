import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginFuncs from "../services";
import "./Login.page.css"


export default function LoginPage() {
  const { makeLogin } = LoginFuncs;
  const navigate = useNavigate();

  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [btnState, setBtnState] = useState(true);
  const [rememberBtn, setRememberBtn] = useState(false)

  
  const rememberMeBtn = () => {
    const btn = document.getElementById('rememberBtn') as HTMLInputElement;
    setRememberBtn(btn.checked);
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
    const token = await makeLogin(username, password);
    if (token !== 'Invalid password') {
      localStorage.removeItem('token')
      localStorage.setItem('token', token);
      rememberMeBtn();
      navigate('/dashboard');
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
          <span>Username: </span>
          <input type="text" value={username} onChange={({ target }) => setUser(target.value)} />
          <span>Password: </span>
          <input type="password" value={password}  onChange={({ target }) => setPass(target.value)}/>
          <button type="button" disabled={btnState} onClick={() => logIn()}>Login</button>
          <label>
            <input type="checkbox" id="rememberBtn" checked={rememberBtn} onClick={() => rememberMeBtn()}/>
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