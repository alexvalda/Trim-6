// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSMM9kh8VtdTtmPwYtEta0OZWAqMQNax0",
  authDomain: "api-rest-cheftable.firebaseapp.com",
  databaseURL: "https://api-rest-cheftable-default-rtdb.firebaseio.com",
  projectId: "api-rest-cheftable",
  storageBucket: "api-rest-cheftable.appspot.com",
  messagingSenderId: "665692077192",
  appId: "1:665692077192:web:06ad39cd5d74667e6cb33d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
