import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./Register.page.css"
import { userApi }  from '../services/index';
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
  const [signUpBtn, setSignUpBtn] = useState(true);

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
        setSignUpBtn(true)
      } else {
        setSignUpBtn(false)
      }
      
    };
    checkEmailAndPassword();
  }, [username, password]);
  
  return (
    <Container id="main-container" className="d-grid h-100 main-container">
      <Form id="sign-in-form" className="text-center">
        <img 
        src="https://d1fdloi71mui9q.cloudfront.net/C0NsWW3AQZaixueqIqGd_oT9fQyp9UcgciKK1"
        className='mb-4 ng-logo'
        alt="ngLogo"
        />
        <h1 className="mb-3 fs-3 fw-normal">Sign up</h1>
        <p className="fs-6 text-muted">Enter your credentials to continue</p>
        <Form.Group controlId='sign-in-username'>
          <Form.Control type='text' size='lg' placeholder='Username' value={username} className='position-relative' onChange={ ({ target }) => setUser(target.value) } />
        </Form.Group>
        <Form.Group className='mb-3 mt-1' controlId="sign-in-password">
          <Form.Control type='password' size='lg' placeholder='Password' value={password} className='position-relative' onChange={ ({ target }) => setPass(target.value) } />
        </Form.Group>
        <div className="d-grid">
          <Button variant="primary" disabled={signUpBtn} onClick={() => registerUser()} size="lg">Sign up</Button>
          <Button variant="primary" className="mt-4" size="lg" onClick={ () => navigate('/') }>Already have an account?</Button>
        </div>
      </Form>
    </Container>
  );
};