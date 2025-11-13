import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsYj1qdlnF3SlAaaybA8etJouNpDZPsZE",
  authDomain: "nayem-wevapp.firebaseapp.com",
  projectId: "nayem-wevapp",
  storageBucket: "nayem-wevapp.firebasestorage.app",
  messagingSenderId: "1064649518591",
  appId: "1:1064649518591:web:5847535e04824deb8e4bca",
  measurementId: "G-EV618Z37V4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export { analytics };