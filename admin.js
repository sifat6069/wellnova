import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ===============================
// Login Check
// ===============================

onAuthStateChanged(auth, (user) => {

  if (!user) {
    alert("Please login first.");
    window.location.href = "index.html";
    return;
  }

});

// ===============================
// Add Wallpaper
// ===============================

const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", async () => {

  const title = document.getElementById("title").value.trim();
  const image = document.getElementById("image").value.trim();
  const category = document.getElementById("category").value;

  if (!title || !image) {
    alert("Please fill all fields.");
    return;
  }

  try {

    await addDoc(collection(db, "wallpapers"), {

      title: title,
      image: image,
      category: category,
      createdAt: Date.now()

    });

    alert("✅ Wallpaper Added Successfully!");

    document.getElementById("title").value = "";
    document.getElementById("image").value = "";
    document.getElementById("category").selectedIndex = 0;

    loadWallpapers();

  } catch (err) {

    console.error(err);
    alert(err.message);

  }

});

// ===============================
// Show Wallpapers
// ===============================

async function loadWallpapers() {

  const list = document.getElementById("wallpaperList");

  if (!list) return;

  list.innerHTML = "";

  const snapshot = await getDocs(collection(db, "wallpapers"));

  snapshot.forEach((wallpaper) => {

    const data = wallpaper.data();

    list.innerHTML += `
      <div style="
      display:flex;
      justify-content:space-between;
      align-items:center;
      background:#222;
      padding:12px;
      margin-bottom:10px;
      border-radius:10px;
      ">

        <span>${data.title}</span>

        <button
        onclick="deleteWallpaper('${wallpaper.id}')"
        style="
        width:auto;
        padding:8px 18px;
        background:red;
        color:white;
        border:none;
        border-radius:8px;
        cursor:pointer;
        ">
        Delete
        </button>

      </div>
    `;

  });

}

// ===============================
// Delete Wallpaper
// ===============================

window.deleteWallpaper = async function(id){

  const ok = confirm("Delete this wallpaper?");

  if(!ok) return;

  await deleteDoc(doc(db,"wallpapers",id));

  alert("Wallpaper Deleted");

  loadWallpapers();

}

// ===============================
// Load List
// ===============================

loadWallpapers();
