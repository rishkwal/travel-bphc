import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { globalContext } from '../../App';
import './Form.css'

function buttonClick(e, to, from, setSamePlace, date, navigate, samePlace) {

  e.preventDefault();
  to === from ? setSamePlace(true) : setSamePlace(false)
  console.log(date)
  if (to && from && date)
    to !== from && navigate('/search')
}

function Form() {
  const context = useContext(globalContext)
  const to = context.to, setTo = context.setTo;
  const from = context.from, setFrom = context.setFrom;
  const date = context.date;
  const setDate = context.setDate;
  const [samePlace, setSamePlace] = useState(false);
  const navaigate = useNavigate();

  return (
    <>
      <form className='search-add-form'>
        {samePlace && <p>error: To and From cannot be same</p>}
        <input value={date} className='form-input' onChange={(e) => { setDate(e.target.value) }} type='date' required />
        <label>From:</label>
        <select value={from} className='form-select' onChange={(e) => setFrom(e.target.value)} required>
          <option>Airport</option>
          <option>Railway Station</option>
          <option>Campus</option>
        </select>
        <label>To:</label>
        <select value={to} className='form-select' onChange={(e) => setTo(e.target.value)} required>
          <option>Airport</option>
          <option>Railway Station</option>
          <option>Campus</option>
        </select>
        <button onClick={(e) => { buttonClick(e, to, from, setSamePlace, date, navaigate) }} type='submit'>Search</button>
      </form>
    </>
  )
}

export default Form
