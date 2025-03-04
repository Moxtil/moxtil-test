// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCXyQ8GT5kZTGF8zXPrw6a5LqTaLn0X2K8",
  authDomain: "moxtil-dashboard-2a647.firebaseapp.com",
  projectId: "moxtil-dashboard-2a647",
  storageBucket: "moxtil-dashboard-2a647.firebasestorage.app",
  messagingSenderId: "1086206401635",
  appId: "1:1086206401635:web:4a0d6d58a1aaf50a8bac56",
  measurementId: "G-RV3QEDYC0C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
