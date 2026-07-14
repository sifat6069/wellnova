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

// ===============================
// Wallpapers
// ===============================

let allWallpapers = [];

async function loadWallpapers(category = "All") {

    const gallery = document.getElementById("gallery");

    if (!gallery) return;

    gallery.innerHTML = "";

    try {

        const snapshot = await getDocs(collection(db, "wallpapers"));

        allWallpapers = [];

        snapshot.forEach((docSnap) => {

            allWallpapers.push({
                id: docSnap.id,
                ...docSnap.data()
            });

        });

        let wallpapers = allWallpapers;

        if (category !== "All") {

            wallpapers = allWallpapers.filter(
                w => w.category === category
            );

        }

        wallpapers.forEach((data) => {

            gallery.innerHTML += `
                <div class="card">

                    <img src="${data.image}" alt="${data.title}">

                    <h3>${data.title}</h3>

                    <button
                        class="download-btn"
                        data-image="${data.image}">
                        Download
                    </button>

                </div>
            `;

        });

        setupDownloadButtons();

    } catch (err) {

        console.error(err);

        gallery.innerHTML =
        "<h2>Failed to load wallpapers.</h2>";

    }

}

loadWallpapers();

// ===============================
// Category Filter
// ===============================

document.querySelectorAll(".categories button")
.forEach(btn => {

    btn.addEventListener("click", () => {

        loadWallpapers(btn.dataset.category);

    });

});

// ===============================
// Search
// ===============================

const searchBox = document.getElementById("searchBox");

if (searchBox) {

    searchBox.addEventListener("input", () => {

        const value = searchBox.value.toLowerCase();

        document.querySelectorAll(".card")
        .forEach(card => {

            const title =
            card.querySelector("h3")
            .textContent
            .toLowerCase();

            card.style.display =
            title.includes(value)
            ? ""
            : "none";

        });

    });

}
