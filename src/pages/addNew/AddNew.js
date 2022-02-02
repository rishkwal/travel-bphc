import React, { useState, useContext } from 'react'
import { globalContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import './AddNew.css'
import { Link } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import db from '../../firebase'

async function buttonClick(e, to, from, setSamePlace, date, time, contact, userId, navigate) {
    e.preventDefault();
    to === from ? setSamePlace(true) : setSamePlace(false)
    to !== from && navigate('/search')
    if (to !== from) {
        try {
            const docRef = await addDoc(collection(db, "travel-card"), {
                name: `${localStorage.getItem('userName')}`,
                date: `${date}`,
                time: `${time}`,
                from: `${from}`,
                to: `${to}`,
                contact: `${contact}`,
                email: `${localStorage.getItem('userEmail')}`,
                uid: `${userId}`
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
}

function AddNew() {
    const context = useContext(globalContext)
    const userId = context.userId;
    const date = context.date, setDate = context.setDate;
    const [time, setTime] = useState();
    const [contact, setContact] = useState();
    const to = context.to, setTo = context.setTo;
    const from = context.from, setFrom = context.setFrom;
    const [samePlace, setSamePlace] = useState();
    const navigate = useNavigate();

    return (
        <div className='add-new'>
            {samePlace && <p style={{ 'textAlign': 'center' }}>error: To and From cannot be same</p>}
            <form className='search-add-form'>
                <label>DATE:</label>
                <input value={date} className='add-input' onChange={(e) => { setDate(e.target.value) }} type='date' required />
                <label>TIME:</label>
                <input className='add-input' onChange={(e) => { setTime(e.target.value) }} type='time' required />
                <label>FROM:</label>
                <select value={from} className='add-select' onChange={(e) => setFrom(e.target.value)} required>
                    <option>Airport</option>
                    <option>Railway Station</option>
                    <option>Campus</option>
                </select>
                <label>TO:</label>
                <select value={to} className='add-select' onChange={(e) => setTo(e.target.value)} required>
                    <option>Airport</option>
                    <option>Railway Station</option>
                    <option>Campus</option>
                </select>
                <label>CONTACT:</label>
                <input onChange={(e) => { setContact(e.target.value) }} className='add-input' type='text' placeholder='Phone No., messenger link, etc' required />
                <div>
                    <button onClick={(e) => { contact && time && buttonClick(e, to, from, setSamePlace, date, time, contact, userId, navigate) }} type='submit'>Add</button>
                </div>
            </form>
            <button className='back-button'><Link to='/search'>Back</Link></button>
        </div>
    )
}

export default AddNew
