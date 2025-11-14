import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Firebase configuration using environment variables for security
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAsYj1qdlnF3SlAaaybA8etJouNpDZPsZE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nayem-wevapp.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nayem-wevapp",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nayem-wevapp.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1064649518591",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1064649518591:web:5847535e04824deb8e4bca",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-EV618Z37V4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export { analytics };