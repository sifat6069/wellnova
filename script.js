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

// ==============================
// Pexels API
// ==============================

const API_KEY = "YOUR_PEXELS_API_KEY";

// ==============================
// Elements
// ==============================

const gallery = document.querySelector(".gallery");
const searchBox = document.getElementById("searchBox");
const loginBtn = document.getElementById("loginBtn");
const userPhoto = document.getElementById("userPhoto");
const userName = document.getElementById("userName");

const ADMIN_EMAIL = "khalidsaifullahsifat@gmail.com";

let currentCategory = "Nature";
let currentPage = 1;
let loading = false;

// ==============================
// Load Wallpapers
// ==============================

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

        const data = await response.json();

        if (page === 1) {
            gallery.innerHTML = "";
        }

        data.photos.forEach(photo => {

            gallery.innerHTML += `
            setTimeout(()=>{

const btns=document.querySelectorAll(".likeBtn");

btns.forEach((btn,index)=>{

loadLikeStatus(data.photos[index].id,btn);

});

},100);
            <div class="card">

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

                   <button
class="likeBtn"
onclick="toggleLike('${photo.id}', this)">
🤍 Like
</button>

                </div>

            </div>
            `;

        });

    } catch (err) {

        console.error(err);

    }

    document.getElementById("loading").style.display = "none";

    loading = false;

}

// First Load
loadWallpapers();

// =====================================
// Google Login / Logout
// =====================================

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

// =====================================
// Auth State
// =====================================

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

    await setDoc(doc(db, "users", user.uid), {

        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        lastLogin: Date.now()

    }, { merge: true });

    // Admin Check

    if (user.email === ADMIN_EMAIL) {

        console.log("✅ Admin Login");

    }

});
// =====================================
// Download
// =====================================

window.downloadWallpaper = function(url){

    window.open(url,"_blank");

};

// =====================================
// Full Screen Preview
// =====================================

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

// =====================================
// Search
// =====================================

searchBox.addEventListener("keypress", (e)=>{

    if(e.key==="Enter"){

        currentCategory = searchBox.value.trim();

        currentPage = 1;

        loadWallpapers(currentCategory,currentPage);

    }

});

// =====================================
// Category Buttons
// =====================================

document.querySelectorAll(".categories button").forEach(btn=>{

    btn.addEventListener("click",()=>{

        currentCategory = btn.dataset.category;

        currentPage = 1;

        loadWallpapers(currentCategory,currentPage);

    });

});

// =====================================
// Infinite Scroll
// =====================================

window.addEventListener("scroll",()=>{

    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 300){

        currentPage++;

        loadWallpapers(currentCategory,currentPage);

    }

});
// =====================================
// Like System
// =====================================

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
                wallpaperId: wallpaperId,
                liked: true,
                time: Date.now()
            });

            button.innerHTML = "❤️ Liked";

        }

    } catch (err) {

        console.error(err);

        alert("Like failed!");

    }

};

// =====================================
// Load Like Status
// =====================================

async function loadLikeStatus(wallpaperId, button){

    if(!auth.currentUser) return;

    const uid = auth.currentUser.uid;

    const likeRef = doc(
        db,
        "likes",
        uid,
        "wallpapers",
        wallpaperId.toString()
    );

    const snap = await getDoc(likeRef);

    if(snap.exists()){

        button.innerHTML="❤️ Liked";

    }

}

// =====================================
// Admin Check
// =====================================

function isAdmin(){

    return auth.currentUser &&
           auth.currentUser.email === ADMIN_EMAIL;

}

// =====================================
// Admin Console
// =====================================

if(isAdmin()){

    console.log("👑 Admin Mode Enabled");

}

// =====================================
// WallNova Ready
// =====================================

console.log("✅ WallNova v3 Loaded");
