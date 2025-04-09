import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBY94DcDEHM1mo9X8CQs5RGV7znioUHuTk",
  authDomain: "stuman-256b6.firebaseapp.com",
  projectId: "stuman-256b6",
  storageBucket: "stuman-256b6.firebasestorage.app",
  messagingSenderId: "253885695665",
  appId: "1:253885695665:web:282aae8564ddf9d8904490",
  measurementId: "G-D008K252NZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();