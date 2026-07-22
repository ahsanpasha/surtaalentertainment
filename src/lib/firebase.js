// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLInUQ_tk7zY2FG4xVLxGsWL_q5H162Jk",
  authDomain: "surtaalentertainment-8f7ae.firebaseapp.com",
  projectId: "surtaalentertainment-8f7ae",
  storageBucket: "surtaalentertainment-8f7ae.firebasestorage.app",
  messagingSenderId: "96917111381",
  appId: "1:96917111381:web:eaa436d2c7133b61a04adc",
  measurementId: "G-5NH01CCP1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);