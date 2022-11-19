import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "../services";
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./Login.page.css"


export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [signInBtn, setSignInBtn] = useState(true);
  const [rememberBtn, setRememberBtn] = useState(false)

  
  const rememberMeBtn = () => {
    const btn = document.getElementById('rememberMeBtn') as HTMLInputElement;
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
        setSignInBtn(true)
      } else {
        setSignInBtn(false)
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
  }, []);

  return (
    <Container id="main-container" className="d-grid h-100 main-container">
      <Form id="sign-in-form" className="text-center w-100">
        <img 
        src="https://d1fdloi71mui9q.cloudfront.net/C0NsWW3AQZaixueqIqGd_oT9fQyp9UcgciKK1"
        className='mb-4 ng-logo'
        alt="ngLogo"
        />
        <h1 className="mb-3 fs-3 fw-normal">Hi, Welcome Back</h1>
        <p className="fs-6 text-muted">Enter your credentials to continue</p>
        <Form.Group controlId='sign-in-username'>
          <Form.Control type='text' size='lg' value={ username } 
            placeholder='Username'  className='position-relative' onChange={ ({ target }) => {setUser(target.value);}} />
        </Form.Group>
        <Form.Group className='mb-3 mt-1' controlId="sign-in-password">
          <Form.Control type='password' value={ password } size='lg'
            placeholder='Password' className='position-relative' onChange={ ({ target }) => {setPass(target.value);}} />
        </Form.Group>
        <Form.Group className="d-flex justify-content-center mb-4" controlId="sign-in-rememberBtn">
          <Form.Check label="Remember me" id="rememberMeBtn" checked={ rememberBtn } onChange={ ({ target }) => { setRememberBtn(target.checked) } } />
        </Form.Group>
        <div className="d-grid">
        <Button variant="primary" size="lg" disabled={signInBtn} onClick={() => {logIn();rememberMeBtn()}}>Sign in</Button>
        <Button variant="primary" size="lg" className="mt-4" onClick={() => {navigate('/register')}}>Dont't have an account?</Button>
        </div>
      </Form>
    </Container>
  );
};