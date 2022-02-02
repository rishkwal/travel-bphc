import React, { useState, useEffect, useContext } from 'react'
import './TravelCard.css'
import { doc, deleteDoc } from "firebase/firestore";
import db from '../../firebase';
import { globalContext } from '../../App';

function deleteEntry(id) {
    deleteDoc(doc(db, "travel-card", id));
}

function setDelete(props, userId, setCanBeDeleted) {
    if (props.userId === userId) setCanBeDeleted(true);
}

function TravelCard(props) {
    const [canBeDeleted, setCanBeDeleted] = useState(false);
    const setDeleteToggle = props.setDeleteToggle;
    const context = useContext(globalContext)
    const userId = context.userId;

    useEffect(() => {
        setDelete(props, userId, setCanBeDeleted)
    }, [])

    return (
        <div className='travel-card'>
            <div className='travel-information'>
                <p>Name: {props.name}</p>
                {props.entry && <p>Date: {props.date}</p>}
                <p>Time: {props.time}</p>
                <p>Contact: {props.contact}</p>
                {props.entry && <p>From: {props.from}</p>}
                {props.entry && <p>To: {props.to}</p>}
                {props.entry && canBeDeleted && <p className='delete' onClick={() => {
                    deleteEntry(props.id)
                    setDeleteToggle(!props.deleteToggle)
                }}>Delete</p>}
            </div>
        </div>
    )
}

export default TravelCard
