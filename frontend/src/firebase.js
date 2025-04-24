import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDY3o7VzqlRAT2tLhsJ2JmNgpySHrWhbFM",
  authDomain: "petconnect-34cff.firebaseapp.com",
  projectId: "petconnect-34cff",
  storageBucket: "petconnect-34cff.appspot.com",
  messagingSenderId: "1016677882345",
  appId: "1:1016677882345:web:502d6606cc02559412d378",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);




