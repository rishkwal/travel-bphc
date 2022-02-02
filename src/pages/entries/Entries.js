import React, { useState, useContext, useEffect } from 'react'
import { globalContext } from '../../App';
import { getDocs, orderBy, query, collection } from 'firebase/firestore'
import db from '../../firebase';
import TravelCard from '../../components/travelCard/TravelCard';
import { Link } from 'react-router-dom';
import './Entries.css'

async function getTravelCards(setTravelcards, deleteToggle, setDeleteToggle) {
    setTravelcards([]);
    const querySnapshot = await getDocs(query(collection(db, "travel-card"), orderBy("time", "asc")));
    const email = localStorage.getItem('userEmail')
    console.log(querySnapshot)
    let cards = [];
    querySnapshot.forEach((doc) => {
        if (doc.data().email === email)
            cards = [...cards, <TravelCard key={doc.id} from={doc.data().from} to={doc.data().to} id={doc.id} name={doc.data().name} time={doc.data().time} contact={doc.data().contact} email={doc.data().email} date={doc.data().date} userId={doc.data().uid} setDeleteToggle={setDeleteToggle} deleteToggle={deleteToggle} entry={true} />]
    })
    setTravelcards(cards)
}

function Entires() {
    const [deleteToggle, setDeleteToggle] = useState(false);

    const context = useContext(globalContext)
    const [travelCards, setTravelcards] = useState([]);
    useEffect(() => {
        getTravelCards(setTravelcards, deleteToggle, setDeleteToggle);
    }, [context.isLoggedIn, deleteToggle])
    return (
        <div className='entries-page'>
            <div className='entries'>
                {travelCards}
            </div>
            <Link to='/search'><button>Back</button></Link>
        </div>
    )
}

export default Entires
