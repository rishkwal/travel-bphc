import './App.css';
import React, { useState, useEffect } from 'react';
import Form from './pages/form/Form'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import TravelList from './pages/travelList/TravelList';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AddNew from './pages/addNew/AddNew';
import handleAuth from './authentication';
import Entries from './pages/entries/Entries';

export const globalContext = React.createContext();

function handleSignOut(setIsLoggedIn) {
  const auth = getAuth();
  signOut(auth).then(() => {
    setIsLoggedIn(false);
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName')
  }).catch((error) => {
    // An error happened.
  });
}

function App() {
  const today = new Date();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [userId, setUserId] = useState();
  const [date, setDate] = useState(`${today.getFullYear()}-${(today.getMonth() + 1) < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1}-${today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()}`);
  const [to, setTo] = useState('Airport');
  const [from, setFrom] = useState('Campus');


  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserId(user.uid)
        localStorage.setItem('userEmail', user.email)
        localStorage.setItem('userName', user.displayName)
      } else {
        setIsLoggedIn(false)
        console.log('User is signed out')
      }
    });
  }, [])

  return (
    <>
      <Router>
        <globalContext.Provider value={{ date: date, setDate: setDate, to: to, setTo: setTo, from: from, setFrom: setFrom, isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn, userId: userId }}>
          <div className="App">
            <div className='all-pages'>
              <div className='nav'>
                {!isLoggedIn ? <h3 className='login' onClick={() => { handleAuth(setIsLoggedIn) }}>LOGIN</h3> :
                  <h3 onClick={() => handleSignOut(setIsLoggedIn)}>LOGOUT</h3>}
                {isLoggedIn && <h3 className='my-entries'><Link to='/entries'>MY ENTRIES</Link></h3>}
              </div>
              <Routes>
                <Route path='/' element={<Form />} />
                <Route path='/search' element={<TravelList />} />
                <Route path='/add' element={<AddNew />} />
                <Route path='/entries' element={<Entries />} />
              </Routes>
            </div>
          </div>
        </globalContext.Provider>
      </Router>
    </>
  );
}

export default App;
