import { auth, provider, db } from "./firebase.js";

import {
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Search
const searchBox = document.getElementById("searchBox");

if (searchBox) {
  searchBox.addEventListener("keyup", function () {
    const value = this.value.toLowerCase();

    document.querySelectorAll(".card").forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = title.includes(value) ? "block" : "none";
    });
  });
}

// Google Login
window.googleLogin = async function () {
  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL
    });

    alert("Welcome " + user.displayName);

  } catch (err) {
    alert(err.message);
    console.error(err);
  }
};

// Login / Logout Button
onAuthStateChanged(auth, (user) => {

  const btn = document.querySelector("button[onclick='googleLogin()']");

  if (!btn) return;

  if (user) {
    btn.textContent = "Logout";

    btn.onclick = async () => {
      await signOut(auth);
    };

  } else {
    btn.textContent = "Login";
    btn.onclick = googleLogin;
  }

});
