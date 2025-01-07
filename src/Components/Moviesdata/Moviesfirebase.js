// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfvSwVSi0D_ngaiEXi4YkvHxlS2GP_ZI4",
  authDomain: "moviesdata-c2647.firebaseapp.com",
  projectId: "moviesdata-c2647",
  storageBucket: "moviesdata-c2647.firebasestorage.app",
  messagingSenderId: "1088282913696",
  appId: "1:1088282913696:web:238527e3001896663112c5",
  measurementId: "G-E3LKXYF49T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);

export default db;