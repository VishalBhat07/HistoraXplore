import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Get Firebase config from environment variables
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

const firebaseConfig = {

  apiKey: "AIzaSyCjM2u6sP9JPy0qjEeC8C_gcIRmPihrshQ",

  authDomain: "historaxplore.firebaseapp.com",

  projectId: "historaxplore",

  storageBucket: "historaxplore.firebasestorage.app",

  messagingSenderId: "861042697114",

  appId: "1:861042697114:web:b958f6d9e03428c958d023",

  measurementId: "G-7VBVB0KKJL"

};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
