// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGWh5Dwuf0Pf0hxrsJQCR1d3Bu1B4HJyU",
  authDomain: "homehero-c5233.firebaseapp.com",
  projectId: "homehero-c5233",
  storageBucket: "homehero-c5233.firebasestorage.app",
  messagingSenderId: "633127486479",
  appId: "1:633127486479:web:1f998bf9e43af3ff13cf7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);