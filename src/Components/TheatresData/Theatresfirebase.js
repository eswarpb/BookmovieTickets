// Import the functions you need from the SDKs you need
import { initializeApp,getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMAq9JuYB33Q0l81aehnmx3jJc7IXrL2s",
  authDomain: "theatresdata-d132e.firebaseapp.com",
  projectId: "theatresdata-d132e",
  storageBucket: "theatresdata-d132e.firebasestorage.app",
  messagingSenderId: "638779743857",
  appId: "1:638779743857:web:5de027fc33caa5195405d0",
  measurementId: "G-QQY2YZY7XM"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}
const datab=getFirestore(app);

export default datab;