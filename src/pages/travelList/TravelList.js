import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import TravelCard from '../../components/travelCard/TravelCard';
import './TravelList.css'
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore'
import db from '../../firebase'
import { globalContext } from '../../App'

async function getTravelCards(setTravelcards, date, to, from) {
    setTravelcards([])
    const querySnapshot = await getDocs(query(collection(db, "travel-card"), orderBy("time", "asc"), where('date', '==', `${date}`)));
    console.log(querySnapshot)
    let cards = []
    querySnapshot.forEach((doc) => {
        if (doc.data().date === date && to === doc.data().to && from === doc.data().from)
            cards = [...cards, <TravelCard key={doc.id} name={doc.data().name} time={doc.data().time} contact={doc.data().contact} />]
    })
    setTravelcards(cards)
}

function TravelList() {

    const [travelCards, setTravelcards] = useState([]);
    const navigate = useNavigate();
    const context = useContext(globalContext)
    const date = context.date;
    const to = context.to, setTo = context.setTo;
    const from = context.from, setFrom = context.setFrom;
    const setDate = context.setDate;
    const isLoggedIn = context.isLoggedIn;
    useEffect(() => {
        getTravelCards(setTravelcards, date, to, from);
    }, [date, to, from, isLoggedIn])
    return (
        <div className='travel-list-page'>
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
            <input value={date} onChange={(e) => setDate(e.target.value)} className='list-input' type='date' required />
            <div className='travel-list'>
                {!isLoggedIn && <p>Please log in using BITS Email to view</p>}
                {isLoggedIn && !travelCards.length && <p>No travellers</p>}
                {travelCards}
            </div>
            <button onClick={() => { to && from && date && navigate('/add') }} type='submit'>Add New</button>
        </div>
    )
}

export default TravelList
