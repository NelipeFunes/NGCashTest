import { useState } from "react";
import LoginFuncs from "../services";
import "./Login.page.css"



export default function LoginPage() {
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const { makeLogin } = LoginFuncs;

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
          <button type="button" onClick={() => makeLogin(username, password)}>Login</button>
        </div>
        <div>
          <button type="button">Don't have an account?</button>
        </div>
      </div>
    </div>
  )
}