import React from 'react'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { ISideBar } from '../interface'
import "./Sidebar.css"

export default function SideBar({
  username , balance, date,credBtn, debBtn, 
  logoff, setDate, setDebBtn, setCredBtn, setDateBtn, filterTransactions
}: ISideBar) {
  return (
    <div className='Sidebar'>
      <div className="mt-2">
        <span>Welcome, {username}</span>
      </div>
      <div className="mt-5 mb-5">
        <span>Balance: R$ {balance}</span>
      </div>
      <Form>
        <h4>Filters:</h4>
        <Form.Group className="" controlId="cash-in-btn">
          <Form.Check label="Cash in" checked={credBtn} onChange={({ target }) => {setCredBtn(target.checked); setDebBtn(!target.value)}} />
        </Form.Group>
        <Form.Group className="" controlId="cash-out-btn">
          <Form.Check label="Cash out" checked={debBtn} onChange={({ target }) => {setDebBtn(target.checked); setCredBtn(!target.value)}} />
        </Form.Group>
        <Form.Group className="" controlId="date-btn">
          <Form.Check label="By Date:" className="mb-3" onChange={ ({ target }) => setDateBtn(target.checked) } />
          <input type="date" className="mb-4" value={date} onChange={ ({ target }) => setDate(target.value) } />
        </Form.Group>
        <Button onClick={() => filterTransactions()}>Filter</Button>
      </Form>
      <footer className='footer'>
        <Button className='btn' onClick={() => logoff()}>LogOff</Button>
      </footer>
    </div>
  )
}