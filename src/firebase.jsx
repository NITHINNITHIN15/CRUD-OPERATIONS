// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"; 
import {getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtKOBKjNJvQXi_OzfQiQTZdeJ1gQZcuhU",
  authDomain: "login-35386.firebaseapp.com",
  projectId: "login-35386",
  storageBucket: "login-35386.firebasestorage.app",
  messagingSenderId: "705097688810",
  appId: "1:705097688810:web:5d951baa85a4b34cfe5993"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;
export {addDoc, getDocs, deleteDoc, doc, collection, updateDoc};