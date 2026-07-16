// ================================
// Firebase Configuration
// ================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ================================
// Firebase Config
// ================================

const firebaseConfig = {
  apiKey: "AIzaSyDovsFKGUWXA7hMGznysbweWz3pb_957m0",
  authDomain: "wellnova-419f3.firebaseapp.com",
  projectId: "wellnova-419f3",
  storageBucket: "wellnova-419f3.firebasestorage.app",
  messagingSenderId: "744778511997",
  appId: "1:744778511997:web:9553d13ff5d9dd5e16a314"
};

// ================================
// Initialize Firebase
// ================================

const app = initializeApp(firebaseConfig);

// ================================
// Services
// ================================

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ================================
// Export
// ================================

export {
  auth,
  db,
  provider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
};
