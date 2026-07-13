import { auth, provider, db } from "./firebase.js";

import {
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  setDoc,
  collection,
  getDocs
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

  const btn = document.getElementById("loginBtn");
  const name = document.getElementById("userName");
  const photo = document.getElementById("userPhoto");

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

// Load Wallpapers From Firestore

async function loadWallpapers() {

    const gallery = document.querySelector(".gallery");

    if (!gallery) return;

    const snapshot = await getDocs(collection(db, "wallpapers"));

    snapshot.forEach((doc) => {

        const data = doc.data();

        gallery.innerHTML += `
        <div class="card">
            <img src="${data.image}">
            <h3>${data.title}</h3>
            <button>Download</button>
        </div>
        `;

    });

}

loadWallpapers();
