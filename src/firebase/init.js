// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCiTA5cn9N1OJ3OcSpmyJWuPSjdv-vOD0",
  authDomain: "week7-chenkai.firebaseapp.com",
  projectId: "week7-chenkai",
  storageBucket: "week7-chenkai.firebasestorage.app",
  messagingSenderId: "1033138792723",
  appId: "1:1033138792723:web:5f2ca0373ee5a0198552e6"
};  

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
export default db;