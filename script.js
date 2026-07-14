import { auth, provider, db } from "./firebase.js";

import {
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ===============================
// GOOGLE LOGIN
// ===============================

window.googleLogin = async () => {

    try{

        const result = await signInWithPopup(auth, provider);

        const user = result.user;

        await setDoc(doc(db,"users",user.uid),{

            uid:user.uid,
            name:user.displayName,
            email:user.email,
            photo:user.photoURL

        },{merge:true});

    }

    catch(err){

        console.log(err);

        alert(err.message);

    }

};

// ===============================
// LOGIN STATE
// ===============================

let currentUser = null;

onAuthStateChanged(auth,(user)=>{

    currentUser=user;

    const btn=document.getElementById("loginBtn");
    const name=document.getElementById("userName");
    const photo=document.getElementById("userPhoto");

    if(!btn) return;

    if(user){

        name.textContent=user.displayName;

        photo.src=user.photoURL;

        photo.style.display="block";

        btn.textContent="Logout";

        btn.onclick=async()=>{

            await signOut(auth);

        };

    }

    else{

        name.textContent="";

        photo.style.display="none";

        btn.textContent="Login";

        btn.onclick=googleLogin;

    }

});

// ===============================
// WALLPAPERS
// ===============================

let allWallpapers = [];

async function loadWallpapers(category = "All") {

    const gallery = document.getElementById("gallery");

    if (!gallery) return;

    gallery.innerHTML = `
        <h2 style="text-align:center;padding:40px;">
            Loading Wallpapers...
        </h2>
    `;

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

            wallpapers = wallpapers.filter(
                w => w.category === category
            );

        }

        gallery.innerHTML = "";

        wallpapers.forEach((data) => {

            gallery.innerHTML += `

            <div class="card">

                <img src="${data.image}" alt="${data.title}">

                <div class="card-body">

                    <h3>${data.title}</h3>

                    <p>${data.category}</p>

                    <div class="card-buttons">

                        <button
                            class="like-btn"
                            data-id="${data.id}">
                            ❤️ Like
                        </button>

                        <button
                            class="download-btn"
                            data-image="${data.image}">
                            ⬇ Download
                        </button>

                    </div>

                </div>

            </div>

            `;

        });

        setupDownloadButtons();

        setupLikeButtons();

    }

    catch(err){

        console.log(err);

        gallery.innerHTML=`

        <h2 style="text-align:center;color:red;padding:40px;">

        Failed to load wallpapers.

        </h2>

        `;

    }

}

loadWallpapers();

// ===============================
// CATEGORY FILTER
// ===============================

document.querySelectorAll(".categories button").forEach(btn=>{

    btn.onclick=()=>{

        loadWallpapers(btn.dataset.category);

    };

});

// ===============================
// SEARCH
// ===============================

const searchBox=document.getElementById("searchBox");

if(searchBox){

searchBox.addEventListener("input",()=>{

const value=searchBox.value.toLowerCase();

document.querySelectorAll(".card").forEach(card=>{

const title=card.querySelector("h3").textContent.toLowerCase();

card.style.display=title.includes(value)?"":"none";

});

});

}

// ===============================
// LIKE SYSTEM
// ===============================

async function setupLikeButtons() {

    document.querySelectorAll(".like-btn").forEach(btn => {

        btn.onclick = async () => {

            if (!currentUser) {

                alert("Please login first.");

                return;

            }

            btn.innerHTML = "❤️ Liked";

            btn.disabled = true;

            try {

                await addDoc(collection(db, "likes"), {

                    wallpaperId: btn.dataset.id,

                    userId: currentUser.uid,

                    createdAt: serverTimestamp()

                });

            } catch (err) {

                console.log(err);

            }

        };

    });

}

// ===============================
// DOWNLOAD BUTTON
// ===============================

function setupDownloadButtons() {

    document.querySelectorAll(".download-btn").forEach(btn => {

        btn.onclick = () => {

            const image = btn.dataset.image;

            const link = document.createElement("a");

            link.href = image;

            link.download = "wallpaper.jpg";

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

        };

    });

}

