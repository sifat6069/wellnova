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
                    onclick="toggleLike('${photo.id}',this)">
                    🤍 Like
                    </button>

                </div>

            </div>

            `;

        });

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

loadWallpapers();
