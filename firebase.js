// Firebase v10 Modules

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
getAuth,
GoogleAuthProvider,
signInWithPopup,
signOut
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
getFirestore
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

import {
getStorage
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

const firebaseConfig = {

apiKey: "AIzaSyDovsFKGUWXA7hMGznysbweWz3pb_957m0",

authDomain: "wellnova-419f3.firebaseapp.com",

projectId: "wellnova-419f3",

storageBucket: "wellnova-419f3.firebasestorage.app",

messagingSenderId: "744778511997",

appId: "1:744778511997:web:9553d13ff5d9dd5e16a314"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);

export { signInWithPopup, signOut };
