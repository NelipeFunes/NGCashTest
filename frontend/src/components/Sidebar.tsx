import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form'
import { ISideBar } from '../interface'
import "./Sidebar.css"
import 'react-bootstrap-typeahead/css/Typeahead.css';

export default function SideBar({
  username , balance, date,credBtn, debBtn, data,
  logoff, setDate, setDebBtn, setCredBtn, setDateBtn, filterTransactions, setValue, realizeTransfer
}: ISideBar) {
  const [showModal, setModal] = useState(false);

  const saveUserTrans = (e: any) => {
    if (!e) {
      return localStorage.removeItem('userTrans');
    }

    localStorage.setItem('userTrans', e[0]);
  }

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
      <Button className="mt-5" onClick={() => setModal(!showModal)}>Transfer</Button>
      <div>
      <Modal show={showModal} onHide={() => setModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <span>Send to: </span>
            <Typeahead
            id='send to'
            labelKey="username" 
            options={data}
            placeholder="Username"
            onChange={(e) => saveUserTrans(e)}
          />
          <Form.Control type="text" placeholder='Value' className='mt-2' onChange={({ target }) => setValue(Number(target.value))} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {setModal(false);realizeTransfer()}}>
            Transfer
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      <footer className='footer'>
        <Button className='btn' onClick={() => logoff()}>LogOff</Button>
      </footer>
    </div>
  )
}