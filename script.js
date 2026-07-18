import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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

const API_KEY = "oeCD73YhbmBgbuMliS2AV6LpVkmqTqd0X37oLyftyros7wAJfl7CCrgl";

const gallery = document.querySelector(".gallery");
const searchBox = document.getElementById("searchBox");
const loginBtn = document.getElementById("loginBtn");
const userPhoto = document.getElementById("userPhoto");
const userName = document.getElementById("userName");

const ADMIN_EMAIL = "khalidsaifullahsifat@gmail.com";

let currentCategory = "Nature";
let currentPage = 1;
let loading = false;

async function loadWallpapers(category="Nature",page=1){

    if(loading) return;

    loading=true;

    document.getElementById("loading").style.display="block";

    try{

        const response=await fetch(
        `https://api.pexels.com/v1/search?query=${category}&per_page=24&page=${page}`,
        {
            headers:{
                Authorization:API_KEY
            }
        });

        const data=await response.json();

        if(page===1){

            gallery.innerHTML="";

        }

        data.photos.forEach(photo=>{

            gallery.innerHTML+=`

            <div class="card">

                <img
                src="${photo.src.large2x}"
                alt="${photo.alt}"
                onclick="previewWallpaper('${photo.src.original}')">

                <h3>${photo.photographer}</h3>

                <div class="actions">

                    <button onclick="downloadWallpaper('${photo.src.original}')">
                    ⬇ Download
                    </button>

                 <button class="likeBtn"
data-id="${photo.id}"
onclick="toggleLike('${photo.id}', this)">
🤍 Like (<span id="count-${photo.id}">0</span>)
</button>

                </div>

            </div>

            `;

        });
await restoreLikeStatus();
    }catch(err){

        console.error(err);

    }

    document.getElementById("loading").style.display="none";

    loading=false;

}
// =========================================
// Google Login / Logout
// =========================================

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

// =========================================
// User State
// =========================================

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

    // Save user to Firestore
    await setDoc(
        doc(db, "users", user.uid),
        {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            lastLogin: Date.now()
        },
        { merge: true }
    );

    // Admin Check
    if (user.email === ADMIN_EMAIL) {
        console.log("👑 Admin Logged In");
    }

});
// =========================================
// Download
// =========================================

window.downloadWallpaper = function(url){

    window.open(url, "_blank");

};

// =========================================
// Full Screen Preview
// =========================================

window.previewWallpaper = function(url){

    const preview = document.getElementById("previewContainer");

    preview.innerHTML = `
        <img src="${url}">
    `;

    preview.classList.add("show");

    preview.onclick = () => {

        preview.classList.remove("show");

        preview.innerHTML = "";

    };

};

// =========================================
// Search
// =========================================

searchBox.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        currentCategory = searchBox.value.trim() || "Nature";
        currentPage = 1;

        loadWallpapers(currentCategory, currentPage);

    }

});

// =========================================
// Category Buttons
// =========================================

document.querySelectorAll(".categories button").forEach(btn => {

    btn.addEventListener("click", () => {

        currentCategory = btn.dataset.category;
        currentPage = 1;

        loadWallpapers(currentCategory, currentPage);

    });

});

// =========================================
// Infinite Scroll
// =========================================

window.addEventListener("scroll", () => {

    if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300 &&
        !loading
    ) {

        currentPage++;

        loadWallpapers(currentCategory, currentPage);

    }

});
// =========================================
// Like System
// =========================================

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

    try {

        const snap = await getDoc(likeRef);

        if (snap.exists()) {

            await deleteDoc(likeRef);

            button.innerHTML = "🤍 Like";

        } else {

            await setDoc(likeRef, {
                wallpaperId,
                liked: true,
                createdAt: Date.now()
            });

            button.innerHTML = "❤️ Liked";

        }

    } catch (err) {

        console.error(err);
        alert("Failed to update like.");

    }

};

// =========================================
// Restore Like Status
// =========================================

async function restoreLikeStatus() {

    if (!auth.currentUser) return;

    const buttons = document.querySelectorAll(".likeBtn");

    for (const btn of buttons) {

        const wallpaperId = btn.getAttribute("data-id");

        if (!wallpaperId) continue;

        const likeRef = doc(
            db,
            "likes",
            auth.currentUser.uid,
            "wallpapers",
            wallpaperId
        );

        const snap = await getDoc(likeRef);

        if (snap.exists()) {
            btn.innerHTML = "❤️ Liked";
        }

    }

}

loadWallpapers();
