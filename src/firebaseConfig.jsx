// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiyLjHqFiE-X8aDrAgZ6hfYEpI4PvGwEw",
  authDomain: "chatvai-react.firebaseapp.com",
  projectId: "chatvai-react",
  storageBucket: "chatvai-react.appspot.com",
  messagingSenderId: "220612669219",
  appId: "1:220612669219:web:f2c4716c3f87d5f80a2696"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig
