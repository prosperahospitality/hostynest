// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCV9o_7ZzJCmeuDa4Yph28L3xJFfoVhYjE",
  authDomain: "aotpapp-5c719.firebaseapp.com",
  projectId: "aotpapp-5c719",
  storageBucket: "aotpapp-5c719.appspot.com",
  messagingSenderId: "818991049034",
  appId: "1:818991049034:web:47b3c375d35b82284579b3",
  measurementId: "G-G9Q9CZRWQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);