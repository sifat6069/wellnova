import { auth, provider } from "./firebase.js";
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

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

    await signInWithPopup(auth, provider);

    alert("Login Successful ✅");

  } catch (err) {

    alert(err.message);

  }

};

// Logout

window.logout = async function () {

  await signOut(auth);

};

// User State

onAuthStateChanged(auth, (user) => {

  if (user) {

    console.log("Logged in:", user.displayName);

  } else {

    console.log("No User");

  }

});
