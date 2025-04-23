// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY3o7VzqlRAT2tLhsJ2JmNgpySHrWhbFM",
  authDomain: "petconnect-34cff.firebaseapp.com",
  projectId: "petconnect-34cff",
  storageBucket: "petconnect-34cff.appspot.com",  // 🔧 Corrected URL
  messagingSenderId: "1016677882345",
  appId: "1:1016677882345:web:502d6606cc02559412d378",
  measurementId: "G-71KCK1FRN1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };

