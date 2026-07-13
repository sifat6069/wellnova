// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDovsFKGUWXA7hMGznysbweWz3pb_957m0",
  authDomain: "wellnova-419f3.firebaseapp.com",
  projectId: "wellnova-419f3",
  storageBucket: "wellnova-419f3.firebasestorage.app",
  messagingSenderId: "744778511997",
  appId: "1:744778511997:web:9553d13ff5d9dd5e16a314",
  measurementId: "G-83MCD9R2CP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
