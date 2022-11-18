import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.page';
import LoginPage from './pages/Login.page';import RegisterPage from './pages/Register.page';
;


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={ <LoginPage /> } />
          <Route path='register' element={ <RegisterPage /> } />
          <Route path='dashboard' element={ <Dashboard />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
