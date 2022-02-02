import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBNrsQr9iIG7F2w_QWoxDxIYcQO5MB5vGw",
  authDomain: "bphctravel.firebaseapp.com",
  projectId: "bphctravel",
  storageBucket: "bphctravel.appspot.com",
  messagingSenderId: "926956852162",
  appId: "1:926956852162:web:8e49eb38dfe22ee5f5fc5b",
  measurementId: "G-HKX3RQ15RY",
};


const app = initializeApp(firebaseConfig);

const db = getFirestore();

export default db;
