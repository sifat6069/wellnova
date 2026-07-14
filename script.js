import { auth, provider, db } from "./firebase.js";

import {
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  collection,
  getDocs,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ===============================
// Google Login
// ===============================

window.googleLogin = async () => {

  try {

    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL
    });

  } catch (err) {

    console.error(err);
    alert(err.message);

  }

};

// ===============================
// Login State
// ===============================

onAuthStateChanged(auth, (user) => {

  const btn = document.getElementById("loginBtn");
  const name = document.getElementById("userName");
  const photo = document.getElementById("userPhoto");

  if (!btn) return;

  if (user) {

    name.textContent = user.displayName;

    photo.src = user.photoURL;

    photo.style.display = "block";

    btn.textContent = "Logout";

    btn.onclick = async () => {

      await signOut(auth);

    };

  } else {

    name.textContent = "";

    photo.style.display = "none";

    btn.textContent = "Login";

    btn.onclick = googleLogin;

  }

});
