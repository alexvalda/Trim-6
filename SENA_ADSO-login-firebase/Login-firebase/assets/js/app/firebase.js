// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB67rIynDk9xpTvH6La0ctnjCMpIMhwaJc",
  authDomain: "login-firebase-63ba1.firebaseapp.com",
  projectId: "login-firebase-63ba1",
  storageBucket: "login-firebase-63ba1.appspot.com",
  messagingSenderId: "806848433972",
  appId: "1:806848433972:web:007930f34bae7f7d6ddf61",
  measurementId: "G-GSFTNSRJCF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);



