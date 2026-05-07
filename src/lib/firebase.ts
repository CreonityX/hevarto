import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCewwJwruGMQI-uwkXImyLy3dNrBlm8hKA",
  authDomain: "hevarto.firebaseapp.com",
  projectId: "hevarto",
  storageBucket: "hevarto.firebasestorage.app",
  messagingSenderId: "1004713671895",
  appId: "1:1004713671895:web:818ae5a6b19f7109954492",
  measurementId: "G-1PXMKE3WK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
