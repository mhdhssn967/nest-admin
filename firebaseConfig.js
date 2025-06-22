// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


export const firebaseConfig = {
  apiKey: "AIzaSyALgvPlNrdoPd9bL-26oqyDdpjAWK9UM0A",
  authDomain: "oqulix-nest.firebaseapp.com",
  projectId: "oqulix-nest",
  storageBucket: "oqulix-nest.firebasestorage.app",
  messagingSenderId: "1062926352512",
  appId: "1:1062926352512:web:c468e8060f8481ef59e665",
  measurementId: "G-8MWSEVG6L9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };