// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsYj1qdlnF3SlAaaybA8etJouNpDZPsZE",
  authDomain: "nayem-wevapp.firebaseapp.com",
  projectId: "nayem-wevapp",
  storageBucket: "nayem-wevapp.firebasestorage.app",
  messagingSenderId: "1064649518591",
  appId: "1:1064649518591:web:5847535e04824deb8e4bca",
  measurementId: "G-EV618Z37V4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export { analytics };