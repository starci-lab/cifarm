// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDqegFZ325PzrxtQtpcJTSacfJT_6HXl4Y",
    authDomain: "cifarm-76b15.firebaseapp.com",
    projectId: "cifarm-76b15",
    storageBucket: "cifarm-76b15.firebasestorage.app",
    messagingSenderId: "616237229219",
    appId: "1:616237229219:web:e2f9ceb83211122a18cb16",
    measurementId: "G-Z4RX7WQJQ4"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
// Initlaize google auth
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
