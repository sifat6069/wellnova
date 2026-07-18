import {
  auth,
  db,
  provider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "./firebase.js";

import {
  doc,
  setDoc,
  getDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

console.log("script.js loaded");
// ================================
// WallNova v2.0
// Pexels API
// ================================

const API_KEY = "oeCD73YhbmBgbuMliS2AV6LpVkmqTqd0X37oLyftyros7wAJfl7CCrgl";

const gallery = document.querySelector(".gallery");
const loginBtn = document.getElementById("loginBtn");
const userPhoto = document.getElementById("userPhoto");
const userName = document.getElementById("userName");

const ADMIN_EMAIL = "khalidsaifullahsifat@gmail.com";

const searchBox = document.getElementById("searchBox");

let currentCategory = "Nature";
let currentPage = 1;
let loading = false;

// ================================
// Load Wallpapers
// ================================

async function loadWallpapers(category = "Nature", page = 1) {

    if (loading) return;

    loading = true;

    document.getElementById("loading").style.display = "block";

    try {

        const response = await fetch(

            `https://api.pexels.com/v1/search?query=${category}&per_page=24&page=${page}`,

            {

                headers: {

                    Authorization: API_KEY

                }

            }

        );

        console.log(response.status);

        const data = await response.json();

        console.log(data);
        
        console.log(data);
        
        console.log(data.photos.length);
        
        if (page === 1) {

            gallery.innerHTML = "";

        }

        data.photos.forEach(photo => {

data.photos.forEach(photo => {

    gallery.innerHTML += `
    <div class="card">

        <img
            src="${photo.src.large2x}"
            alt="${photo.alt}"
            onclick="previewWallpaper('${photo.src.original}')"
            style="cursor:pointer;"
        >

        <h3>${photo.photographer}</h3>

        <div class="actions">

            <button onclick="downloadWallpaper('${photo.src.original}')">
                ⬇ Download
            </button>

            <button onclick="toggleLike('${photo.id}', this)">
                🤍 Like
            </button>

        </div>

    </div>
    `;

});
          
</div>

<img
src="${photo.src.large2x}"
alt="${photo.alt}"
onclick="previewWallpaper('${photo.src.original}')"
style="cursor:pointer;">

<h3>${photo.photographer}</h3>

<div class="actions">

<button onclick="downloadWallpaper('${photo.src.original}')">
⬇ Download
</button>

<button onclick="toggleLike('${photo.id}', this)">
🤍 Like
</button>

</div>

</div>

            `;

        });

    } catch (error) {

        console.error(error);

    }

    document.getElementById("loading").style.display = "none";

    loading = false;

}

// ================================
// Download
// ================================

window.downloadWallpaper = function(url){

    window.open(url,"_blank");

};

// ================================
// First Load
// ================================

loadWallpapers();
// ================================
// Google Login
// ================================

loginBtn.addEventListener("click", async () => {

    if (auth.currentUser) {

        await signOut(auth);
        return;

    }

    try {

        await signInWithPopup(auth, provider);

    } catch (err) {

        alert(err.message);

    }

});

// ================================
// Auth State
// ================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        loginBtn.textContent = "Login with Google";

        userName.textContent = "";

        userPhoto.style.display = "none";

        return;

    }

    loginBtn.textContent = "Logout";

    userName.textContent = user.displayName;

    userPhoto.src = user.photoURL;

    userPhoto.style.display = "block";

    await setDoc(doc(db, "users", user.uid), {

        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        lastLogin: Date.now()

    }, { merge: true });

    if (user.email === ADMIN_EMAIL) {

        console.log("✅ Admin Login");

    }

});
// ===================================
// CATEGORY BUTTONS
// ===================================

document.querySelectorAll(".categories button").forEach(button => {

    button.addEventListener("click", () => {

        currentCategory = button.dataset.category;

        currentPage = 1;

        loadWallpapers(currentCategory, currentPage);

    });

});

// ===================================
// SEARCH
// ===================================

searchBox.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        currentCategory = searchBox.value.trim();

        currentPage = 1;

        loadWallpapers(currentCategory, currentPage);

    }

});

// ===================================
// INFINITE SCROLL
// ===================================

window.addEventListener("scroll", () => {

    if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
    ) {

        currentPage++;

        loadWallpapers(currentCategory, currentPage);

    }

});

// ======================================
// FULL SCREEN IMAGE
// ======================================

window.previewWallpaper = function(url){

    const preview = document.createElement("div");

    preview.style.position="fixed";
    preview.style.left="0";
    preview.style.top="0";
    preview.style.width="100%";
    preview.style.height="100%";
    preview.style.background="rgba(0,0,0,.95)";
    preview.style.display="flex";
    preview.style.alignItems="center";
    preview.style.justifyContent="center";
    preview.style.zIndex="99999";

    preview.innerHTML=`

        <img
        src="${url}"
        style="
        max-width:95%;
        max-height:95%;
        border-radius:15px;
        ">

    `;

    preview.onclick=()=>preview.remove();

    document.body.appendChild(preview);

};

window.toggleLike = async function (wallpaperId, button) {

    if (!auth.currentUser) {
        alert("Please login first.");
        return;
    }

    const uid = auth.currentUser.uid;

    const likeRef = doc(
        db,
        "likes",
        uid,
        "wallpapers",
        wallpaperId.toString()
    );

    const snap = await getDoc(likeRef);

    if (snap.exists()) {

        await deleteDoc(likeRef);

        button.innerHTML = "🤍 Like";

    } else {

        await setDoc(likeRef, {

            liked: true,
            time: Date.now()

        });

        button.innerHTML = "❤️ Liked";

    }

};
