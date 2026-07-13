// Firebase Configuration

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "AIzaSyDovsFKGUWXA7hMGznysbweWz3pb_957m0",

    authDomain: "wellnova-419f3.firebaseapp.com",

    projectId: "wellnova-419f3",

    storageBucket: "wellnova-419f3.firebasestorage.app",

    messagingSenderId: "744778511997",

    appId: "1:744778511997:web:9553d13ff5d9dd5e16a314"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export {
    auth,
    db,
    provider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
};
